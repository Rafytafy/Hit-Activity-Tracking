const express = require('express'),
      router  = express.Router();

const { isAuthenticated } = require('../../middleware')

const Subscriber = require('../../models/Subscriber');

router.post('/getProfileData', isAuthenticated, (req, res) => {
    
    Subscriber.findOne({uid : req.body.uid},  (err,user) =>{
        if(err) {res.json(err)}
        else{
        
        res.json(user)}
    
    })
  
})
module.exports = router;