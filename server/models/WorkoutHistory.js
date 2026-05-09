const mongoose = require("mongoose");

const workoutHistorySchema =
new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  workoutName:String,

  duration:Number,

  calories:Number,

  bmi:Number,

  goal:String,

  level:String,

  completed:{
    type:Boolean,
    default:true
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports =
mongoose.model(
  "WorkoutHistory",
  workoutHistorySchema
);