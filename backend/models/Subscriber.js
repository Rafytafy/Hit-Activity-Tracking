const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const SubscriberSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    birthdate:{
        type: String, 
        required: true
    },
    weight:{
        type: Number,
        required:true
    },
    height:{
        feet:{type: Number, required: true},
        inches:{type: Number, required: true}
    },
    email: {
        type: String,
        required: true
    },
    profilePicURL: {
        type: String,
        default: ''
    },
    routines: []
})

module.exports = mongoose.model('Subscriber', SubscriberSchema);