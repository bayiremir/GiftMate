const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {type: String, required: true},
  sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  read: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}, // Düzeltildi
});

module.exports = mongoose.model('Message', messageSchema);
