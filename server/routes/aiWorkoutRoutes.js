const express =
require("express");

const router =
express.Router();

const Exercise =
require("../models/Exercise");

/* AI WORKOUT */

router.post(
"/generate",

async(req,res)=>{

  try{

    const {
      bmi,
      goal,
      activityLevel
    } = req.body;

    let difficulty =
    "Beginner";

    if(
      activityLevel ===
      "Intermediate"
    ){

      difficulty =
      "Intermediate";
    }

    if(
      activityLevel ===
      "Advanced"
    ){

      difficulty =
      "Advanced";
    }

    let category =
    "Strength";

    /* BMI + GOAL */

    if(
      bmi > 25
    ){

      category =
      "Cardio";
    }

    if(
      goal ===
      "Muscle Gain"
    ){

      category =
      "Strength";
    }

    if(
      goal ===
      "Weight Loss"
    ){

      category =
      "Cardio";
    }

    const workouts =
    await Exercise.find({

      difficulty,
      category

    }).limit(4);

    res.json(workouts);

  }catch(err){

    console.log(err);

    res.status(500).json({

      message:"Server Error"
    });
  }
});

module.exports =
router;