const express = require('express'),
      router  = express.Router({mergeParams: true});

const Trainer = require('../../models/Trainer');
const Subscriber = require('../../models/Subscriber');

const { isAuthenticated } = require('../../middleware')

//@route GET trainer/
//@desc Get all trainers
//@access public
router.get('/', (req, res) => {
    Trainer.find()
    .then(items => res.json(items));
})

//@route GET trainer/:id
//@desc Get trainer by id
//@access public
router.get('/:id', (req, res) => {
    Trainer.find({uid: req.params.id}, (err, trainer) => {
        if(err){
            res.send("There was an error retrieveing the trainer");
        }
        else{
            res.send(trainer);
        }
    })
})


//@route GET trainer/subscribers
//@desc Get all clients of trainer
//@access public
router.get('/subscribers/:id', (req, res) => {
    let clients = []; 
        Trainer.findOne({ uid: req.params.id }, (err, trainer) => {
            if(err){
                console.log(err);
            }
            else{
                for(let i = 0; i < trainer.clients.length; i++){
                    Subscriber.findOne({ uid: trainer.clients[i]}, (err, subscriber) => {
                        if(err){
                            console.log(err)
                        }
                        else{
                            
                            clients.push(subscriber);
                        }
                    })
                }
                setTimeout(() => {
                    res.json(clients)} , 2000);       
            }
        })
    
})

//@route put trainer/subscribers
//@desc Add new scubscriber to trainer client list
//@access public
router.put('/subscribers', (req ,res) => {
    Trainer.findOneAndUpdate({ uid: req.body.trainerId }, {"$push": {clients: req.body.uid}})
    .then(result => {
        if(result){
            res.send("Successfully added to trainer's client list")
        }
        else{
            res.send("Error could not add user to client list")
        }
        
    })
})

//@route get trainer/profilePicture/:id
//@desc get profile path from trainer
//@access public
//Required uid(params): trainer id
router.get('/profilePicture/:id', (req ,res) => {
    Trainer.findOne({ uid: req.params.id }, (err, trainer) => {
        if(err){
            res.send("There was an error retrieve the path of user profile")
        }
        else{
            res.send(trainer.profilePicURL);
        }
    })
})

//@route put trainer/profilePicture/
//@desc add profile path to trainer
//@access public
//Required uid(params): trainer id
//         path(body): path to picture in firebase storage
router.put('/profilePicture/:id', (req ,res) => {
    Trainer.findOneAndUpdate({ uid: req.params.id }, {profilePicURL: req.body.path}, (err, trainer) => {
        if(err){
            res.send("Error could not add path to trainer");
        }
        else{
            
            res.send("Successfuly added profile path of trainer");
        }
    })
})

      
module.exports = router;