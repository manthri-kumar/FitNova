const express =
require("express");

const router =
express.Router();

const WorkoutHistory =
require("../models/WorkoutHistory");

/* SAVE */

router.post(
"/save",

async(req,res)=>{

  try{

    const history =
    new WorkoutHistory(
      req.body
    );

    await history.save();

    res.json({
      message:"Saved"
    });

  }catch(err){

    console.log(err);

    res.status(500).json({
      message:"Server Error"
    });
  }
});

/* GET */

router.get(
"/:userId",

async(req,res)=>{

  try{

    const history =
    await WorkoutHistory.find({

      userId:
      req.params.userId

    }).sort({
      createdAt:-1
    });

    res.json(history);

  }catch(err){

    console.log(err);

    res.status(500).json({
      message:"Server Error"
    });
  }
});

module.exports =
router;