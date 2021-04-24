const fakeSesh = {
  _id: "607c77bb8df56a001591f8e5" ,
  heartrate: [
    { time: "13:54:08", value:  95 },
    { time: "13:54:23", value:  97  },
    { time: "13:54:33", value:  98  },
    { time: "13:54:43", value: 101 },
    { time: "13:54:58", value: 101 },
    { time: "13:55:03", value: 104 },
    { time: "13:55:08", value: 105 },
    { time: "13:55:23", value: 106 },
    { time: "13:55:33", value: 107 },
    { time: "13:55:38", value: 110 },
    { time: "13:55:48", value: 109 },
    { time: "13:55:53", value: 112 },
    { time: "13:56:03", value: 110 },
    { time: "13:56:08", value: 108 },
    { time: "13:56:18", value: 111 },
    { time: "13:56:23", value: 122 },
    { time: "13:56:28", value: 128 },
    { time: "13:56:33", value: 130 },
    { time: "13:56:39", value: 135  },
    { time: "13:56:44", value: 139 },
    { time: "13:56:54", value: 136 },
    { time: "13:56:59", value: 135 },
    { time: "13:57:04", value: 134  },
    { time: "13:57:09", value:  131  },
    { time: "13:57:14", value:  128  },
    { time: "13:57:19", value:  127  },
    { time: "13:57:24", value: 125  },
    { time: "13:57:39", value:  122  },
    { time: "13:57:44", value:  121  },
    { time: "13:57:49", value:  117 },
    { time: "13:57:54", value:  114  },
    { time: "13:57:59", value:  111  },
  ],
  routine: {
    _id: "607c5aa322cea918a81b97d6",
    trainerId: "uuJaR12J9MfLxtEA5cIdIl5nEMf1",
    name: "Lower",
    workouts: [
      {
        workout: {
          imageURL:
            "https://firebasestorage.googleapis.com/v0/b/hit-activity-tracking.appspot.com/o/workout_photos%2FJumping%20Jacks.jpg?alt=media&token=25a9d3e9-c37a-4114-b233-a352ee8130dd",
          videoURL:
            "https://firebasestorage.googleapis.com/v0/b/hit-activity-tracking.appspot.com/o/workout_gifs%2Fjj.gif?alt=media&token=5ad95614-61fe-4020-b3f0-976f17a5a0df",
          name: "Jumping Jacks",
          primary: "Glutes",
          secondary: "Abs",
          instructions:
            "Stand straight with your feet together and hands by your sides. Jump up, spread your feet and bring both hands together above your head. Jump again and return to the starting position. Repeat.",
        },
        _id: "607c5aa322cea918a81b97d7",
        duration:"1" ,
      },
      {
        workout: {
          imageURL:
            "https://firebasestorage.googleapis.com/v0/b/hit-activity-tracking.appspot.com/o/workout_photos%2FSquats.jpg?alt=media&token=d8a65cb1-44e1-4250-a1a8-be62f98df98f",
          videoURL:
            "https://firebasestorage.googleapis.com/v0/b/hit-activity-tracking.appspot.com/o/workout_gifs%2Fsquat.gif?alt=media&token=80b8a966-eab6-48b0-987e-3c684a508d35",
          name: "Squats",
          primary: "Glutes",
          secondary: "Calves",
          instructions:
            "Stand up with your feet shoulder-width apart. Bend your knees, press your hips back and stop the movement once the hip joint is slightly lower than the knees. Press your heels into the floor to return to the initial position. Repeat. ",
        },
        _id: "607c5aa322cea918a81b97d8",
        duration:  "1" ,
      },
      {
        workout: {
          imageURL:
            "https://firebasestorage.googleapis.com/v0/b/hit-activity-tracking.appspot.com/o/workout_photos%2Fburpees.jpg?alt=media&token=4a7cb241-a6e4-4139-9ef5-3f39d8b9d5cf",
          videoURL:
            "https://firebasestorage.googleapis.com/v0/b/hit-activity-tracking.appspot.com/o/workout_gifs%2Fburpee.gif?alt=media&token=4cd72e1c-7dba-434c-9ce8-fe1ef07a88e8",
          name: "Burpee",
          primary: "Full Body",
          secondary: "",
          instructions:
            "Stand straight with your feet shoulder-width apart. Squat and place your hands in front of your feet. Jump back until your legs are fully extended and your body is in plank position. Do a push up, jump forward and then push through the heels to return to the starting position. Repeat. ",
        },
        _id: "607c5aa322cea918a81b97d9",
        duration:  "1" ,
      },
    ],
    targetHeartrate:  60,
 
  },
  user:  "607c54222164ef0015357b29" ,
  date:   "1617733051097"  
 
};

const calculateSuccess = require('../functions/percentageAtTarget')

test('properlay calculate success percentage of workout',() =>
{

    expect(calculateSuccess(190,fakeSesh)).toBe(50)
})