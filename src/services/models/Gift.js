// models/Gift.js
const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  productName: {type: String, required: true},
  amount: {type: Number, required: true},
  sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Gift', giftSchema);
