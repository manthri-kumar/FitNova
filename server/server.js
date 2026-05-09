// server/server.js

const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDB =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const profileRoutes =
require("./routes/profileRoutes");

const workoutRoutes =
require("./routes/workoutRoutes");

const aiWorkoutRoutes =
require("./routes/aiWorkoutRoutes");

const dietRoutes =
require("./routes/dietRoutes");

const app = express();

/* DATABASE */

connectDB();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* ROUTES */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);

app.use(
  "/api/workouts",
  workoutRoutes
);

app.use(
  "/api/ai-workout",
  aiWorkoutRoutes
);

app.use(
  "/api/diet",
  dietRoutes
);

/* TEST */

app.get("/",(req,res)=>{

  res.send(
    "FitNova API Running"
  );
});

/* PORT */

const PORT =
process.env.PORT || 5000;

app.listen(PORT,()=>{

  console.log(
    `Server running on port ${PORT}`
  );
});