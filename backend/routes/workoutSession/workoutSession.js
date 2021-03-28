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
    let TWENTY_MINUTES = 1200000;

    var config = {
        method: 'get',
        url: `https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1sec/time/${req.body.start}/${req.body.end}.json`,
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
                Subscriber.findByIdAndUpdate(
                    req.body.id,
                    { 
                      "$push": {workoutSessions: item._id}
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
        })
        .catch(function (error) {
          console.log(error);
        });
      }, TWENTY_MINUTES)
      
});

module.exports = router;
