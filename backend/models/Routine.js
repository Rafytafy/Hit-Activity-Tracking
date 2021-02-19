const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const RoutineSchema = new Schema({
    trainerId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    workouts: [
        {
            workout: {
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
            },
            duration: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('routine', RoutineSchema);
