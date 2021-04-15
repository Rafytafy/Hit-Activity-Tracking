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
        imageURL: req.body.imageURL,
        videoURL: req.body.videoURL
    })

    newWorkout.save().then(item => res.json(item));
});

router.put('/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            primary: req.body.primary,
            secondary: req.body.secondary,
            instructions: req.body.instructions,
            imageURL: req.body.imageURL,
            videoURL: req.body.videoURL
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

router.put('/workoutPicture/', (req ,res) => {
    Workout.findOneAndUpdate({ uid: req.params.id }, {imageURL: req.body.path}, (err, workout) => {
        if(err){
            res.send("Error could not add image path to workout");
        }
        else{
            
            res.send("Successfuly added picture to workout");
        }
    })
})
router.put('/workoutPicture/', (req ,res) => {
    Workout.findOneAndUpdate({ uid: req.params.id }, {videoURL: req.body.path}, (err, workout) => {
        if(err){
            res.send("Error could not add video path to workout");
        }
        else{
            
            res.send("Successfuly added video to workout");
        }
    })
})

router.get('/workoutPicture/', (req ,res) => {
    Trainer.findOne({ uid: req.params.id }, (err, workout) => {
        if(err){
            res.send("There was an error retrieve the path of workoutPicture")
        }
        else{
            res.send(workout.imageURL);
        }
    })
})
router.get('/workoutVideo/', (req ,res) => {
    Trainer.findOne({ uid: req.params.id }, (err, workout) => {
        if(err){
            res.send("There was an error retrieve the path of workoutVideo")
        }
        else{
            res.send(workout.videoURL);
        }
    })
})

module.exports = router;