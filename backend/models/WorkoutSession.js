const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const WorkoutSessionSchema = new Schema({
    routine: {},
    user: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
    },
    date: { type: Date, default: Date.now },
    heartrate: []
})

module.exports = mongoose.model('workout_session', WorkoutSessionSchema);
