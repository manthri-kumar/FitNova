const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  age: Number,

  gender: String,

  height: Number,

  weight: Number,

  goal: String,

  activityLevel: String

});

module.exports =
  mongoose.model("Profile", profileSchema);