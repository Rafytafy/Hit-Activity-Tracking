const express = require('express'),
      router  = express.Router();

const { isAuthenticated } = require('../../middleware')

const Subscriber = require('../../models/Subscriber');

router.get('/getProfileData', isAuthenticated, (req, res) => {
    Subscriber.findOne({uid : req.body.uid},  (err,user) =>{
        if(err) {console.log( err)}
        else{console.log(user)}

    })
  
})