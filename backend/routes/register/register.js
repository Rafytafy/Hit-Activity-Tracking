const express = require('express'),
      router  = express.Router();

const { isAuthenticated } = require('../../middleware')

const Trainer = require('../../models/Trainer')
const Subscriber = require('../../models/Subscriber');
//@route POST register/subscriber
//@desc Save subscriber to database
//@access private 

router.post('/subscriber', isAuthenticated, (req, res) => {
    const newSub = new Subscriber({
            uid: req.body.uid,               
            name: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
            email: req.body.email,
            birthdate: req.body.birthdate,
            weight: req.body.weight,
            height:{
                feet:req.body.feet,
                inches:req.body.inches
            },
        })
    
        newSub.save().then(item => res.json(item));
})

//@route POST register/trainer
//@desc Save trainer to database
//@access private 

router.post('/trainer', isAuthenticated, (req, res) => {
    const newTrainer = new Trainer({
        uid: req.body.uid, 
        name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        email: req.body.email
    })

    newTrainer.save().then(item => res.json(item));
})

module.exports = router;