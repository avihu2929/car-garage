const mongoose = require('mongoose');

// Define the schema for cars
const carSchema = new mongoose.Schema({
  number: { type: Number, required: true }, // Assuming 'number' is a string
  company: { type: String, required: true }, // The car's company name
  model: { type: String, required: true }, // The car's model
  code: { type: Number, required: false } // The optional code
});

// Create the model
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
