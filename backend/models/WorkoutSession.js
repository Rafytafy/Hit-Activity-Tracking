const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const WorkoutSessionSchema = new Schema({
    routines: {
        type: Schema.Types.ObjectId,
        ref: "routine"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
    },
    heartrate: []
})

module.exports = mongoose.model('workout_session', WorkoutSessionSchema);
