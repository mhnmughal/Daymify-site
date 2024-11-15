const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: [true, "Please enter your username."] },
    email: { type: String, required: [true, "Please enter your email."] },
    password: { type: String, required: [true, "Please enter your password"], select: false },
    avatar: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    role: {
        type: String,
        default: "user",
    },
    // Define structured cartData for better management
    //cartData: [
    //    {
    //        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
    //        quantity: { type: Number, default: 1, required: FinalizationRegistry },
    //        color: { type: String, required: false },  // Selected color
    //        size: { type: String, required: false }    // Selected size
    //    }
    //],
    
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
