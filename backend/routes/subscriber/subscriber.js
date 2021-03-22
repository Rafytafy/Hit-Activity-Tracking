const express = require("express"),
  router = express.Router();

const Subscriber = require("../../models/Subscriber");
const Trainer = require("../../models/Trainer");

//@route get subscriber/:id
//@desc get subscriber data by id
//@access public
router.get("/:id", (req, res) => {
  Subscriber.findById(req.params.id, (err, subscriber) => {
    if (err) {
      res.send("There was an error retrieving the user");
    } else {
      res.send(subscriber);
    }
  });
});

//@route get subscriber/profilePicture/:id
//@desc get profile path from subscriber
//@access public
//Required uid(params): trainer id
router.get("/profilePicture/:id", (req, res) => {
  Subscriber.findOne({ uid: req.params.id }, (err, subscriber) => {
    if (err) {
      res.send("There was an error retrieve the path of user profile");
    } else {
      res.send(subscriber.profilePicURL);
    }
  });
});

//@route put subscriber/profilePicture/
//@desc add profile path to subscriber
//@access public
//Required uid(params): subscriber id
//         path(body): path to picture in firebase storage
router.put("/profilePicture/:id", (req, res) => {
  Subscriber.findOneAndUpdate(
    { uid: req.params.id },
    { profilePicURL: req.body.path },
    (err, subscriber) => {
      if (err) {
        res.send("Error could not add path to trainer");
      } else {
        res.send("Successfuly added profile path of trainer");
      }
    }
  );
});

router.get("/trainers/:search", (req, res) => {
  if (req.params.search == "" || req.params.search == null) {
    Trainer.find().then((items) => res.json(items));
  } else {
    var search = `^${req.params.search}`;
    Trainer.find(
      {
        $or: [
          { "name.firstName": { $regex: search, $options: "i" } },
          { "name.lastName": { $regex: search, $options: "i" } },
        ],
      },
      (err, trainers) => {
        if (err) {
          res.json(err);
        } else {
          res.json(trainers);
        }
      }
    );
  }
});
router.put("/addWeight/:id", (req, res) => {
  Subscriber.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        weights: {
          weight: req.body.weight,
          date: req.body.date,
        },
      },
    },
    (err, userweight) => {
      if (err) {
        res.send("did not add weight");
      } else {
        res.send("did add weight");
      }
    }
  );
});

//@route put subscriber/program/:id
//@desc update program of subscriber
//@access public
//Required _id(params): if of object
router.put("/program/:id", (req, res) => {
  Subscriber.findByIdAndUpdate(
    req.params.id,
    { routines: req.body.routines },
    (err, subscriber) => {
      if (err) {
        res.send(`Error in updating user program. Error: ${err}`);
      } else {
        res.send("Updated program for Subscriber");
      }
    }
  );
});

router.get("/getTrainer/:first/:last", (req, res) => {
  var first = req.params.first;
  var last = req.params.last;
  Trainer.find(
    { $and: [{ "name.firstName": first }, { "name.lastName": last }] },
    (err, trainer) => {
      if (err) {
        res.json(err);
      } else {
        res.json(trainer);
      }
    }
  );
});

router.put("/subcribeToTrainer/", (req, res) => {
  console.log(req.body.trainer);
  Trainer.findByIdAndUpdate(
    req.body.trainer,
    { $push: { clients: req.body.user } },
    (err, sub) => {
      if (err) {
        res.send("didnt sub");
      } else {
        res.send("subed");
      }
    }
  );
});

router.get("/getWeights/:id", (req, res) => {
  Subscriber.findById(req.params.id, (err, sub) => {
    if (err) {
      res.json(err);
    } else {
      res.json(sub.weights);
    }
  });
});
router.get("/getRoutines/:id", (req, res) => {
  Subscriber.findById(req.params.id, (err, sub) => {
    if (err) {
      res.json(err);
    } else {
      res.json(sub.routines);
    }
  });
});
router.put("/uploadSubPhoto/", (req, res) => {
  Subscriber.findByIdAndUpdate(
    req.body.user,
    { profilePicURL: req.body.path },
    (err, sub) => {
      if (err) {
        res.send("pic not uploaded");
      } else {w
        res.json(sub);
      }
    }
  );
});

router.get("/getSubPhoto/:id", (req, res) => {
  Subscriber.findById(req.params.id, (err, sub) => {
    if (err) {
      res.json(err);
    } else {
      res.json(sub.profilePicURL);
    }
  });
});

//@route put subscriber/accessToken/:id
//@desc add access token to user
//@access public
router.put("/fitbitTokens/:id", (req, res) => {
  Subscriber.findByIdAndUpdate(
    req.params.id,
    { 
      accessToken: req.body.accessToken,
      refreshToken: req.body.refreshToken
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
