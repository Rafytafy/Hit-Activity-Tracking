const express = require('express'),
      router  = express.Router();

const { isAuthenticated } = require('../../middleware')

const Trainer = require('../../models/Trainer')

//@route POST register/subscriber
//@desc Save subscriber to database
//@access private 

router.post('/subscriber', isAuthenticated, (req, res) => {
    res.send(req.body);
})

//@route POST register/trainer
//@desc Save trainer to database
//@access private 

router.post('/trainer', isAuthenticated, (req, res) => {
    const newTrainer = new Trainer({
        name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        email: req.body.email
    })

    newTrainer.save().then(item => res.json(item));
})

module.exports = router;