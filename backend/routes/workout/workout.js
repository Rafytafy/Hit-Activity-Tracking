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

router.put('/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            primary: req.body.primary,
            secondary: req.body.secondary,
            instructions: req.body.instructions
        }, 
        (err, workout) => {
            if(err){
                res.send("There was an error updating workout")
            }
            else{
                res.send("Workout Updated")
            }
    })
});

router.delete('/:id', (req, res) => {
    Workout.findByIdAndDelete(req.params.id, (err, workout) => {
        if(err){
            res.send("There was an error deleteing workout")
        }
        else{
            res.send("Workout deleted")
        }
    })
});
      
module.exports = router;