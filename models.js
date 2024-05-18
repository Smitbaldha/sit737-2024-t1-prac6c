const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
    num1: { type: Number, required: true },
    num2: { type: Number, required: true },
    operation: { type: String, enum: ['add', 'subtract', 'multiply', 'divide', 'exponential'], required: true },
    result: { type: Number, required: true },
}, { timestamps: true });

const Calculation = mongoose.model('Calculation', calculationSchema);

module.exports = Calculation;
