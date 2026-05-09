require("dotenv").config();

const mongoose = require("mongoose");

const Workout =
require("./models/Workout");

mongoose.connect(
  process.env.MONGO_URI
);

const workouts = [

  {
    goal:"Weight Loss",

    level:"Beginner",

    workouts:[
      "20 Min Walking",
      "15 Squats",
      "20 Jumping Jacks",
      "10 Pushups"
    ],

    duration:30,

    calories:250
  },

  {
    goal:"Muscle Gain",

    level:"Beginner",

    workouts:[
      "20 Pushups",
      "15 Pullups",
      "25 Squats",
      "15 Bench Press"
    ],

    duration:45,

    calories:420
  },

  {
    goal:"Maintain Fitness",

    level:"Intermediate",

    workouts:[
      "Cycling",
      "Stretching",
      "Yoga",
      "Light Running"
    ],

    duration:35,

    calories:300
  }

];

async function seed(){

  try{

    await Workout.deleteMany();

    await Workout.insertMany(workouts);

    console.log("Workout Seeded");

    process.exit();

  }catch(err){

    console.log(err);
  }
}

seed();