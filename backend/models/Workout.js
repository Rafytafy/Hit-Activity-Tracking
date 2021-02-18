const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const WorkoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    primary: {
        type: String,
        required: true
    },
    secondary: {
        type: String,
    },
    instructions: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        default: ''
    },
    videoURL: {
        type: String,
        default: ''
    },
})

module.exports = mongoose.model('workout', WorkoutSchema);
