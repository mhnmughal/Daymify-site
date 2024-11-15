// models/PromoCode.js

const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicates
  },
  discount: {
    type: Number,
    required: true, // Discount percentage (e.g., 10 for 10%)
  },
  expirationDate: {
    type: Date,
    default: null, // Optional, if not provided it won't expire
  },
}, { timestamps: true });

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

module.exports = PromoCode;
