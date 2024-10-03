const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: false }
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
