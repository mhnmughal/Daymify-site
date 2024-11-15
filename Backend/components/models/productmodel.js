const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    colors: [{ type: String }],
    sizes: [{ type: String }],
    description: { type: String, required: true },
    brand: { type: String },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
    visible: { type: Boolean, required: true },

    // New field for multi-currency pricing with old and new prices
    prices: {
        USD: {
            oldprice: { type: Number },
            newprice: { type: Number },
        },
        EUR: {
            oldprice: { type: Number },
            newprice: { type: Number },
        },
        PKR: {
            oldprice: { type: Number },
            newprice: { type: Number },
        },
        GBP: {
            oldprice: { type: Number },
            newprice: { type: Number },
        },
        AED: {
            oldprice: { type: Number },
            newprice: { type: Number },
        },
    }
});

module.exports = mongoose.model('Product', productSchema);
