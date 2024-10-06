const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  password: { type: String, required: true }
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
