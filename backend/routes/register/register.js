const express = require('express'),
      router  = express.Router();

const { isAuthenticated } = require('../../middleware')


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
    res.send(req.body);
})

module.exports = router;