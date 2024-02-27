const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Your other user schema fields
  username: String,
  password: String,
  balance: Number,
  friendRequests: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: []},
  ],
  friendList: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: []},
  ],
  inventory: [{type: String, default: []}],
  messages: [
    {
      sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      message: String,
    },
  ],
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
