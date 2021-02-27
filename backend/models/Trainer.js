const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const TrainerSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
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
    routines: [{
        type: Schema.Types.ObjectId,
        ref: "routine"
    }],
    clients: []
})

module.exports = mongoose.model('trainer', TrainerSchema);
