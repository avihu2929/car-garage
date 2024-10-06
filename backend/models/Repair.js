const mongoose = require('mongoose');
const { Schema } = mongoose;

const repairSchema = new Schema({
    carNumber: { type: String, required: true },
    clientPhone: { type: String, required: true },
    price: { type: Number, required: false },
    issue: { type: String, required: false },
    resolved: { type: Boolean, required: false }
  }, {
    timestamps: true // Generate createdAt and updatedAt timestamps automatically
  });

const Repair = mongoose.model('Repair', repairSchema);

module.exports = Repair;