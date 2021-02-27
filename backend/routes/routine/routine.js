const express = require('express'),
      router  = express.Router({mergeParams: true});

const Routine = require('../../models/Routine');
const Trainer = require('../../models/Trainer');

//@route GET routine/:id
//@desc Get routines of trainer
//@access public
router.get('/:id', (req, res) => {
    Trainer.findOne({uid: req.params.id})
        .populate('routines')
        .exec((err, trainer) => {
            if(err){
                res.send(err);
            }
            else {
                res.send(trainer.routines)
            }
        })
})

//@route POST routine/
//@desc Create new routine
//@access public
router.post('/', (req, res) => {
    const newRoutine = new Routine({
        trainerId: req.body.id,
        name: req.body.name,
        workouts: req.body.workouts,
    })
    newRoutine.save()
        .then( item => {
            Trainer.findOneAndUpdate({ uid: req.body.id }, {"$push": {routines: item._id}}, (err, trainer) => {
                if(err){
                    res.send("Error could not push routine to traine");
                }
                else{ 
                    res.send("Successfuly added routine to trainer");
                }
        })
    });
});

router.delete('/:id', (req, res) => {
    Routine.findByIdAndDelete(req.params.id, (err, routine) => {
        if(err){
            res.send("There was an error deleteing workout")
        }
        else{
            res.send("Workout deleted")
        }
    })
});
module.exports = router;