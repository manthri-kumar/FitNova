import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  /* STATES */

  const [bmi, setBmi] =
    useState("0");

  const [bmiCategory,
    setBmiCategory] =
    useState("Normal");

  const [calories,
    setCalories] =
    useState(0);

  const [workoutTime,
    setWorkoutTime] =
    useState(0);

  const [streak,
    setStreak] =
    useState(0);

  const [timer,
    setTimer] =
    useState(0);

  const [isRunning,
    setIsRunning] =
    useState(false);

  const [isPaused,
    setIsPaused] =
    useState(false);

  const [completed,
    setCompleted] =
    useState([]);

  const [currentWorkoutIndex,
    setCurrentWorkoutIndex] =
    useState(0);

  const [userWeight,
    setUserWeight] =
    useState(60);

  /* BMI INPUTS */

  const [heightInput,
    setHeightInput] =
    useState("");

  const [weightInput,
    setWeightInput] =
    useState("");

  /* WORKOUTS */

  const workouts = [

    {
      name:"20 Pushups",
      duration:300,
      met:8
    },

    {
      name:"15 Pullups",
      duration:240,
      met:9
    },

    {
      name:"25 Squats",
      duration:360,
      met:7
    },

    {
      name:"15 Bench Press",
      duration:420,
      met:6
    }

  ];

  /* LOAD PROFILE */

  useEffect(() => {

    if(!user){

      navigate("/");
      return;
    }

    fetchProfile();

  }, []);

  /* STREAK */

  useEffect(() => {

    const savedStreak =
      localStorage.getItem(
        "streak"
      );

    if(savedStreak){

      setStreak(
        parseInt(savedStreak)
      );
    }

  }, []);

  /* FETCH PROFILE */

  const fetchProfile = async () => {

    try{

      const response =
      await fetch(
        `http://localhost:5000/api/profile/${user._id}`
      );

      const data =
      await response.json();

      if(data.weight){

        setUserWeight(
          data.weight
        );
      }

      if(data.height){

        setHeightInput(
          data.height
        );
      }

      if(data.weight){

        setWeightInput(
          data.weight
        );
      }

      if(data.height && data.weight){

        calculateBMIValue(
          data.height,
          data.weight
        );
      }

    }catch(err){

      console.log(err);
    }
  };

  /* =========================================
   REPLACE YOUR OLD BMI SECTION
   INSIDE Dashboard.js
========================================= */

/* BMI */

const calculateBMIValue = (
  height,
  weight
) => {

  const heightValue =
    parseFloat(height);

  const weightValue =
    parseFloat(weight);

  /* VALIDATION */

  if(
    !heightValue ||
    !weightValue
  ){

    return;
  }

  /* CALCULATION */

  const h =
    heightValue / 100;

  const result =
    (
      weightValue /
      (h * h)
    ).toFixed(1);

  const bmiNumber =
    parseFloat(result);

  /* SET BMI */

  setBmi(result);

  /* CATEGORY */

  if(bmiNumber < 18.5){

    setBmiCategory(
      "Underweight"
    );
  }

  else if(
    bmiNumber >= 18.5 &&
    bmiNumber < 25
  ){

    setBmiCategory(
      "Normal"
    );
  }

  else if(
    bmiNumber >= 25 &&
    bmiNumber < 30
  ){

    setBmiCategory(
      "Overweight"
    );
  }

  else{

    setBmiCategory(
      "Obese"
    );
  }
};

/* BUTTON */

const calculateBMI = () => {

  if(
    heightInput === "" ||
    weightInput === ""
  ){

    alert(
      "Enter height and weight"
    );

    return;
  }

  calculateBMIValue(
    heightInput,
    weightInput
  );
};

  /* TIMER */

  useEffect(() => {

    let interval;

    if(
      isRunning &&
      !isPaused
    ){

      interval =
      setInterval(() => {

        setTimer(prev =>
          prev + 1
        );

        setWorkoutTime(prev =>
          prev + 1
        );

        const current =
          workouts[
            currentWorkoutIndex
          ];

        const caloriesPerSecond =

        (
          current.met *
          userWeight *
          3.5
        ) / 200 / 60;

        setCalories(prev =>

          parseFloat(
            (
              prev +
              caloriesPerSecond
            ).toFixed(2)
          )
        );

      }, 1000);
    }

    return () =>
      clearInterval(interval);

  }, [
    isRunning,
    isPaused,
    currentWorkoutIndex,
    userWeight
  ]);

  /* AUTO COMPLETE */

  useEffect(() => {

    if(!isRunning) return;

    const current =
      workouts[currentWorkoutIndex];

    if(timer >= current.duration){

      const completeWorkout =
      async() => {

        setCompleted(prev => [

          ...prev,
          currentWorkoutIndex

        ]);

        /* SAVE HISTORY */

        try{

          await fetch(
          "http://localhost:5000/api/history/save",
          {

            method:"POST",

            headers:{
              "Content-Type":
              "application/json"
            },

            body:JSON.stringify({

              userId:user._id,

              workoutName:
              current.name,

              duration:
              current.duration,

              calories:
              Math.floor(calories),

              bmi,

              goal:"Weight Loss",

              level:"Beginner",

              completed:true
            })
          });

        }catch(err){

          console.log(err);
        }

        setTimer(0);

        if(
          currentWorkoutIndex <
          workouts.length - 1
        ){

          setCurrentWorkoutIndex(
            prev => prev + 1
          );
        }

        else{

          setIsRunning(false);

          setIsPaused(false);

          const updatedStreak =
            streak + 1;

          setStreak(
            updatedStreak
          );

          localStorage.setItem(
            "streak",
            updatedStreak
          );

          alert(
            "Workout Completed!"
          );
        }
      };

      completeWorkout();
    }

  }, [timer]);

  /* CONTROLS */

  const startWorkout = () => {

    if(!isRunning){

      setIsRunning(true);

      setIsPaused(false);
    }
  };

  const pauseWorkout = () => {

    setIsPaused(true);
  };

  const resumeWorkout = () => {

    setIsPaused(false);
  };

  /* FORMAT TIME */

  const formatTime = (
    seconds
  ) => {

    const mins =
      Math.floor(seconds / 60);

    const secs =
      seconds % 60;

    return `${mins}m ${secs}s`;
  };

  /* HEALTH RISK */

  const getHealthRisk = () => {

    if(bmi >= 30){

      return "High Obesity Risk";
    }

    if(bmi >= 25){

      return "Moderate Risk";
    }

    if(bmi < 18.5){

      return "Underweight Risk";
    }

    return "Healthy";
  };

 /* DIET PLAN */

const getDietPlan = () => {

  const bmiValue =
    parseFloat(bmi);

  let plan = {};

  if(bmiValue < 18.5){

    plan = {

      title:
      "Weight Gain Diet",

      calories:
      "2800 kcal",

      protein:
      "170g",

      carbs:
      "350g",

      fats:
      "80g",

      water:
      "4L",

      goal:
      "Calorie Surplus",

      meals:[

        "🥣 Oats + Peanut Butter + Banana",

        "🥚 Egg Omelette + Brown Bread",

        "🍗 Chicken Breast + Rice",

        "🥛 Protein Shake + Dry Fruits",

        "🍚 Paneer + Sweet Potato"
      ]
    };
  }

  else if(
    bmiValue >= 18.5 &&
    bmiValue < 25
  ){

    plan = {

      title:
      "Balanced Fitness Diet",

      calories:
      "2500 kcal",

      protein:
      "160g",

      carbs:
      "250g",

      fats:
      "70g",

      water:
      "4L",

      goal:
      "Maintain Fitness",

      meals:[

        "🍓 Fruits + Oats",

        "🥚 Eggs + Toast",

        "🍗 Chicken + Rice + Vegetables",

        "🥗 Salad + Green Tea",

        "🐟 Fish + Sweet Potato"
      ]
    };
  }

  else if(
    bmiValue >= 25 &&
    bmiValue < 30
  ){

    plan = {

      title:
      "Fat Loss Diet",

      calories:
      "1900 kcal",

      protein:
      "150g",

      carbs:
      "140g",

      fats:
      "55g",

      water:
      "5L",

      goal:
      "Calorie Deficit",

      meals:[

        "🥣 Oats + Chia Seeds",

        "🥚 Boiled Eggs + Salad",

        "🍗 Grilled Chicken + Vegetables",

        "🥗 Green Salad + Soup",

        "🍵 Green Tea + Almonds"
      ]
    };
  }

  else{

    plan = {

      title:
      "Obesity Reduction Diet",

      calories:
      "1600 kcal",

      protein:
      "140g",

      carbs:
      "100g",

      fats:
      "45g",

      water:
      "5L",

      goal:
      "Aggressive Fat Loss",

      meals:[

        "🥬 Detox Smoothie",

        "🥚 Egg Whites + Vegetables",

        "🍗 Lean Chicken + Salad",

        "🥦 Broccoli + Soup",

        "🍵 Green Tea"
      ]
    };
  }

  return plan;
};

const diet =
  getDietPlan();

  /* LOGOUT */

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <div className="dashboard">

      {/* SIDEBAR */}

      <div className="sidebar">

        <div>

          <h1 className="logo">
            FitNova
          </h1>

          <p className="tagline">
            Premium Fitness Dashboard
          </p>

          <ul className="menu">

            <li className="active">
              Dashboard
            </li>

            <li
              onClick={() =>
                navigate("/profile")
              }
            >
              Profile
            </li>

            <li>
              Workout Plans
            </li>

            <li>
              Calories
            </li>

            <li>
              Progress
            </li>

          </ul>

        </div>

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* MAIN */}

      <div className="main-content">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>

            <h1>

              Welcome Back,
              <span>
                {" "}
                {user?.username}
              </span>

            </h1>

            <p>
              Track your health and
              fitness journey
            </p>

          </div>

          <div className="profile-avatar">

            {
              user?.username
              ?.charAt(0)
              ?.toUpperCase()
            }

          </div>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stats-card">

            <div className="stats-top">

              <h3>BMI</h3>

            </div>

            <h1>{bmi}</h1>

            <p>{bmiCategory}</p>

          </div>

          <div className="stats-card">

            <div className="stats-top">

              <h3>Calories</h3>

            </div>

            <h1>

              {Math.floor(calories)}

            </h1>

            <p>
              Calories Burned
            </p>

          </div>

          <div className="stats-card">

            <div className="stats-top">

              <h3>
                Workout Time
              </h3>

            </div>

            <h1>

              {
                formatTime(
                  workoutTime
                )
              }

            </h1>

            <p>
              Live Workout
            </p>

          </div>

          <div className="stats-card">

            <div className="stats-top">

              <h3>Streak</h3>

            </div>

            <h1>{streak}</h1>

            <p>
              Active Days
            </p>

          </div>

        </div>

        {/* LOWER */}

        <div className="dashboard-grid">

          {/* WORKOUT */}

          <div className="dashboard-card large-card">

            <div className="card-header">

              <h2>
                Today's Workout
              </h2>

              <div
                style={{
                  display:"flex",
                  gap:"10px"
                }}
              >

                {
                  !isRunning && (

                    <button
                      onClick={startWorkout}
                    >
                      Start
                    </button>
                  )
                }

                {
                  isRunning &&
                  !isPaused && (

                    <button
                      onClick={pauseWorkout}
                    >
                      Pause
                    </button>
                  )
                }

                {
                  isRunning &&
                  isPaused && (

                    <button
                      onClick={resumeWorkout}
                    >
                      Resume
                    </button>
                  )
                }

              </div>

            </div>

            {
              isRunning && (

                <div
                  className="live-workout"
                >

                  {
                    isPaused
                    ? "Paused:"
                    : "Current:"
                  }

                  {" "}

                  {
                    workouts[
                      currentWorkoutIndex
                    ].name
                  }

                  {" "}-

                  {" "}

                  {
                    formatTime(timer)
                  }

                  /

                  {
                    formatTime(
                      workouts[
                        currentWorkoutIndex
                      ].duration
                    )
                  }

                </div>
              )
            }

            {/* WORKOUT LIST */}

            <div className="workout-list">

              {
                workouts.map(
                  (
                    workout,
                    index
                  )=>(

                  <div
                    className="workout-item"
                    key={index}
                  >

                    <div
                      className="workout-check"
                    >

                      {
                        completed.includes(index)
                        ? "✓"
                        : index ===
                          currentWorkoutIndex
                          &&
                          isRunning
                        ? "▶"
                        : ""
                      }

                    </div>

                    <span>

                      {workout.name}

                    </span>

                  </div>
                ))
              }

            </div>

          </div>

          {/* INSIGHTS */}

          <div className="dashboard-card large-card">

            <h2>
              Health Insights
            </h2>

            <div className="insight-box">

              <h3>
                Your Fitness Status
              </h3>

              <p>

                {
                  bmiCategory ===
                  "Normal"

                  ?

                  "Great job maintaining a healthy body composition."

                  :

                  bmiCategory ===
                  "Underweight"

                  ?

                  "Increase healthy calorie intake and strength workouts."

                  :

                  "Focus on cardio and balanced nutrition."
                }

              </p>

              <p
                style={{
                  marginTop:"15px"
                }}
              >

                Health Risk:
                {" "}
                {getHealthRisk()}

              </p>

            </div>

            {/* DIET */}

            <div
              className="diet-box"
            >

              <h3>
                Diet Recommendation
              </h3>

              <p>
                Calories:
                {" "}
                {diet.calories}
              </p>

              <p>
                Protein:
                {" "}
                {diet.protein}
              </p>

              <p>
                Carbs:
                {" "}
                {diet.carbs}
              </p>

              <p>
                Water:
                {" "}
                {diet.water}
              </p>

            </div>

            {/* PROGRESS */}

            <div className="progress-item">

              <div className="progress-label">

                <span>
                  Workout Completion
                </span>

                <span>

                  {
                    Math.floor(
                      (
                        completed.length /
                        workouts.length
                      ) * 100
                    )
                  }%

                </span>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:
                    `${
                      (
                        completed.length /
                        workouts.length
                      ) * 100
                    }%`
                  }}
                ></div>

              </div>

            </div>

          </div>

        </div>

        {/* BMI */}

        <div className="dashboard-card bmi-card">

          <div className="card-header">

            <h2>
              BMI Calculator
            </h2>

          </div>

          <div className="bmi-calculator">

            <input
              type="number"
              placeholder="Height (cm)"
              value={heightInput}
              onChange={(e)=>
                setHeightInput(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Weight (kg)"
              value={weightInput}
              onChange={(e)=>
                setWeightInput(
                  e.target.value
                )
              }
            />

            <button
              onClick={calculateBMI}
            >
              Calculate BMI
            </button>

          </div>

        </div>

      </div>

    </div>
  );
  
}

export default Dashboard;