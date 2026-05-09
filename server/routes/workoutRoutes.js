const express = require("express");

const router = express.Router();

const Workout =
require("../models/Workout");

/* GET WORKOUT */

router.get(
"/:goal/:level",

async(req,res)=>{

  try{

    const workout =
    await Workout.findOne({

      goal:req.params.goal,

      level:req.params.level
    });

    if(!workout){

      return res.status(404).json({

        message:"Workout Not Found"
      });
    }

    res.json(workout);

  }catch(err){

    console.log(err);

    res.status(500).json({

      message:"Server Error"
    });
  }
});

module.exports = router;