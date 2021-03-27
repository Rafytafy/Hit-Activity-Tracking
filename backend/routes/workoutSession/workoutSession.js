const { response } = require("express");
const express = require("express"),
      axios = require("axios")
  router = express.Router();

const Subscriber = require("../../models/Subscriber");
const WorkoutSession = require("../../models/WorkoutSession");



//@route put workoutSession/
//@desc add access token to user
//@access public
router.post("/", (req, res) => {
    
    var config = {
        method: 'get',
        url: `https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min/time/17:00/18:00.json`,
        headers: { 
          'Authorization': `Bearer ${req.body.access_token}`
        }
      };
      setTimeout(() => {
        axios(config)
        .then(function (response) {
          console.log(response['data']['activities-heart-intraday']['dataset']);
          const newWorkoutSession = new WorkoutSession({
                routine: req.body.routine,
                user: req.body.id,
                heartrate: response['data']['activities-heart-intraday']['dataset']
            })

            newWorkoutSession.save().then(item =>{
                // Subscriber.findByIdAndUpdate(
                //     req.body.id,
                //     { 
                //       accessToken: req.body.accessToken
                //     },
                //     (err, subscriber) => {
                //       if (err) {
                //         res.send("Error could not add tokens to subscriber");
                //       } else {
                //         res.send("Successfuly added tokens to subscriber");
                //       }
                //     }
                //   );
            });
        })
        .catch(function (error) {
          console.log(error);
        });
      }, 1000)
      



      Subscriber.findByIdAndUpdate(
    req.params.id,
    { 
      accessToken: req.body.accessToken
    },
    (err, subscriber) => {
      if (err) {
        res.send("Error could not add tokens to subscriber");
      } else {
        res.send("Successfuly added tokens to subscriber");
      }
    }
  );
});

module.exports = router;
