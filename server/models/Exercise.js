const mongoose = require("mongoose");

const exerciseSchema =
new mongoose.Schema({

  name:String,

  category:String,

  difficulty:String,

  muscles:[String],

  caloriesPerMinute:Number,

  duration:Number,

  instructions:String,

  image:String

});

module.exports =
mongoose.model(
  "Exercise",
  exerciseSchema
);