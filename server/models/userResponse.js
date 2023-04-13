const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
  // Define your user response schema fields and types
});

module.exports = mongoose.model('UserResponse', userResponseSchema);
