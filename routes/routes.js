const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.get("/", (req, res) => {
  res.sendFile("index.html");
});

router.get("/exercise", (req, res) => {
  res.sendFile("index.html");
});

router.get("/stats", (req, res) => {
  res.sendFile("stats.html");
});

router.post("/api/workouts/", ({ body }, res) => {
 Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts/:id", ({ body }, res) => {
  Workout.update(
    { _id: req.params.id }, 
    { $push: { exercises: body } 
  })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
 Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
     .sort({ date: -1 })
     .then(dbWorkout => {
       res.json(dbWorkout);
     })
     .catch(err => {
       res.status(400).json(err);
     });
 });

module.exports = router;