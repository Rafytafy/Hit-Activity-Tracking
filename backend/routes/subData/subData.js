const express = require('express'),
      router  = express.Router();

const { isAuthenticated } = require('../../middleware')

const Subscriber = require('../../models/Subscriber');

router.post('/getProfileData', isAuthenticated, (req, res) => {
    console.log('this is stuff for rafy')
    Subscriber.findOne({uid : req.body.uid},  (err,user) =>{
        if(err) {console.log( err)}
        else{console.log(user)}

    })
  
})
module.exports = router;