const router = require("express").Router();
const path = require("path");
const Workout = require("../models/Workout.js");

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

router.get("/exercise", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/stats.html"));
});

router.post("/api/workouts/", ({ body }, res) => {
 console.log(body);
 Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);
  Workout.update(
    { _id: req.params.id }, 
    { $push: { exercises: req.body } 
  })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      console.log(err)
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