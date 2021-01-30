const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const SubscriberSchema = new Schema({
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    birthdate:{
        type: String, 
        required: true
    },
    weight:{
        type: Int16Array,
        required:true
    },
    height:{
        feet:{type: Int16Array, required: true},
        inches:{type: Int16Array, required: true}
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

module.exports = Robot = mongoose.model('trainer', TrainerSchema);