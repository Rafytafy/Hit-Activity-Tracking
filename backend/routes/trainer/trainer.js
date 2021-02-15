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


//@route GET trainer/subscribers
//@desc Get all trainers
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
            setTimeout(() => res.json(clients) , 2000);       
        }
    })
})

//@route put trainer/subscribers
//@desc add new scubscriber to trainer client list
//@access public
router.put('/subscribers', (req ,res) => {
    console.log(req.body);
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


      
module.exports = router;