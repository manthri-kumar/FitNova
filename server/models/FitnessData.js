const mongoose = require("mongoose");

const fitnessSchema =
new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,

    ref:"User"
  },

  height:Number,

  weight:Number,

  bmi:Number,

  caloriesBurned:{
    type:Number,

    default:0
  },

  workoutTime:{
    type:Number,

    default:0
  },

  goal:{
    type:String,

    default:"Weight Loss"
  }

},{ timestamps:true });

module.exports =
mongoose.model(
  "FitnessData",
  fitnessSchema
);