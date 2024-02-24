const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

const jwt = require('jsonwebtoken');

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
        expiresIn: '1h',
      });
      return res.json({user, token});
    });
  })(req, res, next);
});

app.post('/transfer-balance', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  if (!senderId || !receiverId || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'Sender or receiver not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Sender does not have enough balance' });
    }

    // Bakiye transferi
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    res.json({ message: 'Balance transferred successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during the transfer' });
  }
});


passport.use(
  new LocalStrategy(
    {usernameField: 'username'},
    async (username, password, done) => {
      try {
        const user = await User.findOne({username});
        if (!user || !(await user.isValidPassword(password))) {
          return done(null, false, {
            message: 'Incorrect username or password.',
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);
