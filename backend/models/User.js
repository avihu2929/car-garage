const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  name: { type: String, required: false }
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
