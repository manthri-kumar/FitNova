// server/models/Diet.js

const mongoose = require("mongoose");

const dietSchema =
new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  bmi:Number,

  goal:String,

  calories:Number,

  protein:String,

  carbs:String,

  fats:String,

  water:String,

  mealPlan:[
    String
  ]

},{
  timestamps:true
});

module.exports =
mongoose.model(
  "Diet",
  dietSchema
);