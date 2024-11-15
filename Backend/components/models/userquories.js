const mongoose = require('mongoose');
const quoriesSchema = new mongoose.Schema({
    firstname: {type: String,  required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    phone : {type: Number, required: false},
    subject:  {type: String, required: false},
    message:  {type: String, required: true},
    status:  {type: String, required: false, default: 'pending'}
})

module.exports = mongoose.model('userquories', quoriesSchema);