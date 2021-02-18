const express = require('express'),
      router  = express.Router({mergeParams: true});

const Workout = require('../../models/Workout');

//@route GET workout/
//@desc Get all workouts
//@access public
router.get('/', (req, res) => {
    Workout.find()
    .then(items => res.json(items));
});

router.post('/', (req, res) => {
    const newWorkout = new Workout({
        name: req.body.name,
        primary: req.body.primary,
        secondary: req.body.secondary,
        instructions: req.body.instructions,
    })

    newWorkout.save().then(item => res.json(item));
});
      
module.exports = router;