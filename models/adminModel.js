const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    priveledge:{
        type:Boolean,   
        required:false,
        default: false
    }
})

module.exports = mongoose.model('Admin', adminSchema);