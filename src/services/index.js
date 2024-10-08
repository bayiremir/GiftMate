const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const path = require('path');

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

io.on('connection', socket => {
  console.log('Yeni bir kullanıcı bağlandı.');

  socket.on('disconnect', () => {
    console.log('Kullanıcı bağlantıyı kesti.');
  });

  socket.on('sendMessage', message => {
    console.log('Gönderilen mesaj:', message);
    io.emit('receiveMessage', message);
  });
});

server.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor.`);
});
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

const User = require('./models/User');
const Gift = require('./models/Gift');
const Message = require('./models/Message');

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
app.post('/login', async (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) return next(err);
    if (user) {
      const token = jwt.sign(user.toJSON(), opts.secretOrKey);
      return res.json({user, token});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

// Profile route
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
    const {username} = req.body;
    const user = req.user;

    try {
      const friend = await User.findOne({username});
      if (!friend) {
        return res.status(404).json({message: 'Friend not found'});
      }

      if (friend._id.equals(user._id)) {
        return res
          .status(400)
          .json({message: 'You cannot send friend request to yourself'});
      }
      if (user.friends.includes(friend._id)) {
        return res.status(400).json({message: 'You are already friends'});
      }
      if (friend.friendRequests.includes(user._id)) {
        return res.status(400).json({message: 'Friend request already sent'});
      }

      friend.friendRequests.push(user._id);
      await friend.save();

      res.json({message: 'Friend request sent successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'An error occurred'});
    }
  },
);

app.get(
  '/friend-requests',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const user = req.user;

    try {
      const userWithRequests = await User.findById(user._id).populate(
        'friendRequests',
        'username',
      );
      res.json({friendRequests: userWithRequests.friendRequests});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'An error occurred'});
    }
  },
);

app.post(
  '/accept-friend-request',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {friendId} = req.body; // Arkadaşın ID'si
    const user = req.user;

    try {
      const friend = await User.findById(friendId);
      if (!friend) {
        return res.status(404).json({message: 'Friend not found'});
      }

      if (!user.friendRequests.includes(friendId)) {
        return res.status(400).json({message: 'No friend request found'});
      }

      if (user.friends.includes(friendId)) {
        return res.status(400).json({message: 'You are already friends'});
      }

      // Arkadaşlık isteğini kaldır
      user.friendRequests = user.friendRequests.filter(
        request => request.toString() !== friendId,
      );
      user.friends.push(friendId); // Arkadaşı ekle
      await user.save();

      friend.friends.push(user._id); // Kendini arkadaş olarak ekle
      await friend.save();

      res.json({message: 'Friend request accepted'});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'An error occurred'});
    }
  },
);

app.get(
  '/friends',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const user = req.user;

    try {
      const userWithFriends = await User.findById(user._id).populate(
        'friends',
        'username',
      );
      res.json({friends: userWithFriends.friends});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'An error occurred'});
    }
  },
);

//gift
app.get(
  '/sent-gifts',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const userWithSentGifts = await User.findById(req.user._id).populate(
        'sentGifts',
      );
      res.json(userWithSentGifts.sentGifts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({message: 'An error occurred while fetching sent gifts'});
    }
  },
);

app.post(
  '/purchase',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {productName, giftReceiverId, amount} = req.body;
    const buyer = req.user;

    if (!productName || !giftReceiverId || amount == null) {
      return res.status(400).json({message: 'Missing required fields'});
    }

    try {
      const giftReceiver = await User.findById(giftReceiverId);
      if (!giftReceiver) {
        return res.status(404).json({message: 'Gift receiver not found'});
      }

      if (buyer.balance < amount) {
        return res
          .status(400)
          .json({message: 'Buyer does not have enough balance'});
      }

      // Yeni Gift oluştur
      const newGift = await Gift.create({
        productName,
        amount,
        sender: buyer._id,
        receiver: giftReceiverId,
      });

      // Bakiye güncelleme
      buyer.balance -= amount;
      buyer.sentGifts.push(newGift._id); // Gönderilen hediye listesine ekle
      await buyer.save();

      giftReceiver.receivedGifts.push(newGift._id); // Alınan hediye listesine ekle
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

// Bu endpoint'i kullanarak mesaj gönderebilirsiniz
app.post(
  '/send-message',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const {receiverId, content} = req.body;
    const sender = req.user;

    if (!receiverId || !content) {
      return res.status(400).json({message: 'Missing required fields'});
    }

    try {
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        return res.status(404).json({message: 'Receiver not found'});
      }

      const newMessage = await Message.create({
        sender: sender._id,
        receiver: receiverId,
        content,
      });

      res.json({message: 'Message sent successfully'});

      io.emit('receiveMessage', newMessage);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({message: 'An error occurred while sending message'});
    }
  },
);

app.get(
  '/messages',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const user = req.user;

    try {
      const messages = await Message.find({
        $or: [{receiver: user._id}, {sender: user._id}],
      })
        .populate('sender', 'username')
        .populate('receiver', 'username');
      res.json(messages);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({message: 'An error occurred while fetching messages'});
    }
  },
);

// Bu endpoint'i kullanarak envanteri alabilirsiniz
app.get(
  '/get-inventory',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const user = req.user;
    try {
      const userWithInventory = await User.findById(user._id).populate(
        'inventory',
      );
      const inventory = userWithInventory.inventory;
      res.json(inventory);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({message: 'An error occurred while fetching inventory'});
    }
  },
);

app.get(
  '/received-gifts',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const userWithReceivedGifts = await User.findById(req.user._id).populate(
        'receivedGifts',
      );
      res.json(userWithReceivedGifts.receivedGifts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({message: 'An error occurred while fetching received gifts'});
    }
  },
);

app.get(
  '/ticket',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const userWithTicket = await User.findById(req.user._id).populate(
        'ticket',
      );
      res.json(userWithTicket.ticket);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({message: 'An error occurred while fetching ticket'});
    }
  },
);

app.use('/public', express.static(path.join(__dirname, 'public')));
