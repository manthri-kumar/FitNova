require("dotenv").config();

const mongoose =
require("mongoose");

const Exercise =
require("./models/Exercise");

mongoose.connect(
  process.env.MONGO_URI
);

const exercises = [

  {
    name:"Pushups",
    category:"Strength",
    difficulty:"Beginner",
    muscles:[
      "Chest",
      "Triceps"
    ],
    caloriesPerMinute:8,
    duration:5,
    instructions:
    "Keep body straight and lower chest.",
    image:
    "https://i.imgur.com/UYiroysl.jpg"
  },

  {
    name:"Jump Rope",
    category:"Cardio",
    difficulty:"Intermediate",
    muscles:[
      "Legs",
      "Core"
    ],
    caloriesPerMinute:12,
    duration:10,
    instructions:
    "Maintain steady jumps.",
    image:
    "https://i.imgur.com/8Km9tLL.jpg"
  },

  {
    name:"Squats",
    category:"Strength",
    difficulty:"Beginner",
    muscles:[
      "Legs",
      "Glutes"
    ],
    caloriesPerMinute:7,
    duration:6,
    instructions:
    "Keep back straight.",
    image:
    "https://i.imgur.com/ZANVnHE.jpg"
  },

  {
    name:"Burpees",
    category:"HIIT",
    difficulty:"Advanced",
    muscles:[
      "Full Body"
    ],
    caloriesPerMinute:15,
    duration:8,
    instructions:
    "Explosive full body movement.",
    image:
    "https://i.imgur.com/5tj6S7Ol.jpg"
  }

];

async function seed(){

  await Exercise.deleteMany();

  await Exercise.insertMany(
    exercises
  );

  console.log(
    "Exercises Seeded"
  );

  process.exit();
}

seed();