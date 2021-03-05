const express = require('express'),
      router  = express.Router();

const Subscriber = require('../../models/Subscriber');
const Trainer = require('../../models/Trainer');

//@route get subscriber/profilePicture/:id
//@desc get profile path from subscriber
//@access public
//Required uid(params): trainer id
router.get('/profilePicture/:id', (req ,res) => {
    Subscriber.findOne({ uid: req.params.id }, (err, subscriber) => {
        if(err){
            res.send("There was an error retrieve the path of user profile")
        }
        else{
            res.send(subscriber.profilePicURL);
        }
    })
})

//@route put subscriber/profilePicture/
//@desc add profile path to subscriber
//@access public
//Required uid(params): subscriber id
//         path(body): path to picture in firebase storage
router.put('/profilePicture/:id', (req ,res) => {
    Subscriber.findOneAndUpdate({ uid: req.params.id }, {profilePicURL: req.body.path}, (err, subscriber) => {
        if(err){
            res.send("Error could not add path to trainer");
        }
        else{
            
            res.send("Successfuly added profile path of trainer");
        }
    })
})

router.get('/trainers/:search', (req,res)=> {
    if(req.params.search=='' ||req.params.search==null ){
        Trainer.find()
        .then(items => res.json(items));   
    }
    else{
    var search=`^${req.params.search}`
    Trainer.find({$or: 
        [{'name.firstName': {$regex: search ,$options:'i'}},
        {'name.lastName': {$regex: search ,$options:'i'}}]},(err, trainers)=>{
        if(err)
         {res.json(err)}
        else
        {
        res.json(trainers)}
    })
}
})
router.put('/addWeight/:id', (req ,res) => {
    
    Subscriber.findByIdAndUpdate(req.params.id ,
        {$push: 
            {weights:
                {
                    weight:req.body.weight,
                    date:req.body.date
                }
            }
        }, (err, userweight) => {
        if(err){
            res.send("did not add weight")}
        else{
            res.send("did add weight")}
    })
})

router.get('/getTrainer/',(req,res)=>{
    var first=req.query.first
    var last=req.query.last
    Trainer.find({$and: 
        [{'name.firstName': first},
        {'name.lastName': last}]},(err, trainer)=>{
        if(err)
         {res.json(err)}
        else
        {res.json(trainer)}
    })
})


module.exports = router;
