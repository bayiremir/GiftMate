const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  balance: {type: Number, default: 30},
  inventory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  friendRequests: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  friendList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
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
