const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true },
  cars: [{ type: Number }]
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
