const mongoose = require("mongoose");

const workoutSchema =
new mongoose.Schema({

  goal:{
    type:String
  },

  level:{
    type:String
  },

  workouts:[
    String
  ],

  duration:{
    type:Number
  },

  calories:{
    type:Number
  }

});

module.exports =
mongoose.model(
  "Workout",
  workoutSchema
);