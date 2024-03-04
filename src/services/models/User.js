const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  friendRequests: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  balance: Number,
  sentGifts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
    },
  ],
  receivedGifts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
    },
  ],
  inventory: [{type: String, default: []}],
  profilePicture: {type: String, default: ''},
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
