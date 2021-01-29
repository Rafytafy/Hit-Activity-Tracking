const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const TrainerSchema = new Schema({
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
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
