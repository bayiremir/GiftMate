const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

const jwt = require('jsonwebtoken');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'your_jwt_secret'; // JWT imzalamak için kullanılan gizli anahtar

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }),
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({username});
        if (!user) {
          return done(null, false, {message: 'User not found'});
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, {message: 'Wrong Password'});
        }
        return done(null, user, {message: 'Logged in Successfully'});
      } catch (error) {
        return done(error);
      }
    },
  ),
);

mongoose
  .connect(
    'mongodb+srv://bayiremir2:Beratbyr241@giftmate.jjx8vfj.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Connected to the Database successfully');
  })
  .catch(err => {
    console.log('Error: ', err);
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const User = require('./models/User');

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = new User({username, password});
    await user.save();
    res.status(201).json({message: 'User created successfully'});
  } catch (error) {
    res.status(500).json({message: 'Error creating the user'});
  }
});

// Login route
app.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user,
      });
    }
    req.login(user, {session: false}, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), 'your_jwt_secret', {
        expiresIn: '24h',
      });
      return res.json({user, token});
    });
  })(req, res, next);
});

app.get(
  '/profile',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json(req.user);
  },
);

app.post(
  '/send-friend-request',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {friendId} = req.body;
    const user = req.user;

    user.friendRequests = user.friendRequests || [];
    user.friends = user.friends || [];

    try {
      const friend = await User.findById(friendId);
      if (!friend) {
        return res.status(404).json({message: 'Friend not found'});
      }

      // friendRequests ve friends alanlarını friend objesi için de kontrol edin ve başlatın
      friend.friendRequests = friend.friendRequests || [];
      friend.friends = friend.friends || [];

      if (user.friendRequests.includes(friendId)) {
        return res.status(400).json({message: 'Friend request already sent'});
      }

      if (user.friends.includes(friendId)) {
        return res.status(400).json({message: 'User is already your friend'});
      }

      friend.friendRequests.push(user._id);
      await friend.save();

      user.friendRequests.push(friendId);
      await user.save();

      res.json({message: 'Friend request sent successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'An error occurred while sending friend request',
      });
    }
  },
);

app.get(
  '/friend-requests',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const user = req.user;
    try {
      const friendRequests = await User.find({_id: {$in: user.friendRequests}});
      res.json(friendRequests);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({message: 'An error occurred while fetching friend requests'});
    }
  },
);

app.post(
  '/accept-friend-request',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {friendId} = req.body;
    const user = req.user;

    user.friendList = user.friendList || [];
    user.friendRequests = user.friendRequests || [];

    try {
      const friend = await User.findById(friendId);
      if (!friend) {
        return res.status(404).json({message: 'Friend not found'});
      }

      // ObjectId'leri string'e çevirerek karşılaştırma
      if (!user.friendRequests.map(id => id.toString()).includes(friendId)) {
        return res.status(400).json({message: 'No friend request found'});
      }

      // Arkadaşlık isteğini kaldır
      user.friendRequests = user.friendRequests.filter(
        id => id.toString() !== friendId,
      );

      // Arkadaşı friendList'e ekle
      user.friendList.push(friendId);
      await user.save();

      friend.friendList = friend.friendList || [];
      friend.friendList.push(user._id.toString()); // Burada da aynı dönüşümü yapmak iyi bir pratik olabilir
      await friend.save();

      res.json({message: 'Friend request accepted successfully'});
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({message: 'An error occurred while accepting friend request'});
    }
  },
);

app.post(
  '/purchase',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {productId, giftReceiverId, amount} = req.body;
    const buyer = req.user; // JWT'den gelen kullanıcı bilgisi

    if (!productId || !giftReceiverId || amount == null) {
      return res.status(400).json({message: 'Missing required fields'});
    }

    try {
      // Buyer'ın (satın alanın) bakiyesi kontrol edilir, bu zaten req.user üzerinden sağlanmıştır.
      const giftReceiver = await User.findById(giftReceiverId); // Hediye alıcısını bul

      if (!giftReceiver) {
        return res.status(404).json({message: 'Gift receiver not found'});
      }

      if (buyer.balance < amount) {
        return res
          .status(400)
          .json({message: 'Buyer does not have enough balance'});
      }

      // Bakiye düşürme ve hediye envantere ekleme
      buyer.balance -= amount;
      giftReceiver.inventory.push(productId);

      await buyer.save();
      await giftReceiver.save();

      res.json({message: 'Product purchased and gifted successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'An error occurred during the purchase and gift process',
      });
    }
  },
);

app.post(
  '/send-message',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {receiverId, message} = req.body;
    const sender = req.user;

    if (!receiverId || !message) {
      return res.status(400).json({message: 'Missing required fields'});
    }

    try {
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        return res.status(404).json({message: 'Receiver not found'});
      }

      receiver.messages.push({
        sender: sender._id,
        message,
      });

      await receiver.save();
      res.json({message: 'Message sent successfully'});
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({message: 'An error occurred while sending message'});
    }
  },
);

app.get(
  '/get-messages',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const user = req.user;
    try {
      const messages = await User.find({_id: {$in: user.friendList}}).populate(
        'messages.sender',
      );
      res.json(messages);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({message: 'An error occurred while fetching messages'});
    }
  },
);
