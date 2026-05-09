import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

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

  const [fitnessScore,
    setFitnessScore] =
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

  /* LOAD */

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

      if(
        data.height &&
        data.weight
      ){

        calculateBMIValue(
          data.height,
          data.weight
        );
      }

    }catch(err){

      console.log(err);
    }
  };

  /* BMI */

  const calculateBMIValue = (
    height,
    weight
  ) => {

    const heightValue =
      parseFloat(height);

    const weightValue =
      parseFloat(weight);

    if(
      !heightValue ||
      !weightValue
    ){

      return;
    }

    const h =
      heightValue / 100;

    const result =
      (
        weightValue /
        (h * h)
      ).toFixed(1);

    const bmiNumber =
      parseFloat(result);

    setBmi(result);

    /* CATEGORY */

    if(bmiNumber < 18.5){

      setBmiCategory(
        "Underweight"
      );

      setFitnessScore(65);
    }

    else if(
      bmiNumber >= 18.5 &&
      bmiNumber < 25
    ){

      setBmiCategory(
        "Normal"
      );

      setFitnessScore(95);
    }

    else if(
      bmiNumber >= 25 &&
      bmiNumber < 30
    ){

      setBmiCategory(
        "Overweight"
      );

      setFitnessScore(70);
    }

    else{

      setBmiCategory(
        "Obese"
      );

      setFitnessScore(45);
    }
  };

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

      setCompleted(prev => [

        ...prev,
        currentWorkoutIndex

      ]);

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

  /* FORMAT */

  const formatTime = (
    seconds
  ) => {

    const mins =
      Math.floor(seconds / 60);

    const secs =
      seconds % 60;

    return `${mins}m ${secs}s`;
  };

  /* HEALTH */

  const getHealthRisk = () => {

    if(bmiCategory === "Underweight"){

      return "Low Weight Risk";
    }

    if(bmiCategory === "Normal"){

      return "Healthy";
    }

    if(bmiCategory === "Overweight"){

      return "Moderate Risk";
    }

    return "High Risk";
  };

  const getHealthMessage = () => {

    if(bmiCategory === "Underweight"){

      return "Increase healthy calorie intake and strength workouts.";
    }

    if(bmiCategory === "Normal"){

      return "Great job maintaining a healthy body composition.";
    }

    if(bmiCategory === "Overweight"){

      return "Focus on cardio and calorie deficit diet.";
    }

    return "Reduce weight through active lifestyle and healthy nutrition.";
  };

  const getWorkoutSuggestion = () => {

    if(bmiCategory === "Underweight"){

      return "Strength Training";
    }

    if(bmiCategory === "Normal"){

      return "Balanced Fitness";
    }

    if(bmiCategory === "Overweight"){

      return "Fat Burn HIIT";
    }

    return "Walking + Cardio";
  };

  /* DIET */

  const getDietPlan = () => {

    let plan = {};

    if(bmiCategory === "Underweight"){

      plan = {

        calories:"2800 kcal",

        protein:"170g",

        carbs:"350g",

        water:"4L",

        meals:[

          "Oats + Banana Smoothie",

          "Eggs + Brown Bread",

          "Chicken + Rice Bowl",

          "Protein Shake"
        ]
      };
    }

    else if(
      bmiCategory === "Normal"
    ){

      plan = {

        calories:"2500 kcal",

        protein:"160g",

        carbs:"250g",

        water:"4L",

        meals:[

          "Fruits + Oats",

          "Eggs + Toast",

          "Chicken + Rice",

          "Green Salad"
        ]
      };
    }

    else if(
      bmiCategory === "Overweight"
    ){

      plan = {

        calories:"1900 kcal",

        protein:"150g",

        carbs:"140g",

        water:"5L",

        meals:[

          "Oats + Chia Seeds",

          "Boiled Eggs",

          "Grilled Chicken",

          "Salad + Soup"
        ]
      };
    }

    else{

      plan = {

        calories:"1600 kcal",

        protein:"140g",

        carbs:"100g",

        water:"5L",

        meals:[

          "Detox Smoothie",

          "Egg Whites",

          "Lean Chicken",

          "Broccoli Soup"
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
            AI Fitness Dashboard
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

            <li
              onClick={() =>
                navigate("/workouts")
              }
            >
              Workout Plans
            </li>

            <li
              onClick={() =>
                navigate("/calories")
              }
            >
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
              Track your health
              and fitness journey
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

              <h3>
                Fitness Score
              </h3>

            </div>

            <h1>
              {fitnessScore}%
            </h1>

            <p>
              AI Health Rating
            </p>

          </div>

        </div>

        {/* GRID */}

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

            {/* LIVE */}

            {
              isRunning && (

                <div className="live-workout">

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
                  ) => {

                    const isCurrent =
                      index ===
                      currentWorkoutIndex;

                    const isCompleted =
                      completed.includes(index);

                    return (

                      <div
                        className={`
                          workout-item
                          ${
                            isCurrent
                            ? "active-workout"
                            : ""
                          }
                        `}
                        key={index}
                      >

                        {/* LEFT */}

                        <div
                          className="workout-left"
                        >

                          {/* ICON */}

                          <div
                            className={`
                              workout-check

                              ${
                                isCompleted
                                ? "completed-icon"

                                : isCurrent &&
                                  isRunning

                                ? "active-icon"

                                : "pending-icon"
                              }
                            `}
                          >

                            {

                              isCompleted

                              ?

                              "✓"

                              :

                              isCurrent &&
                              isRunning

                              ?

                              isPaused

                                ?

                                "❚❚"

                                :

                                "▶"

                              :

                              "○"
                            }

                          </div>

                          {/* INFO */}

                          <div>

                            <h4
                              className="workout-name"
                            >

                              {workout.name}

                            </h4>

                            <p
                              className="workout-duration"
                            >

                              Duration:
                              {" "}

                              {
                                formatTime(
                                  workout.duration
                                )
                              }

                            </p>

                          </div>

                        </div>

                        {/* STATUS */}

                        <div
                          className="workout-status"
                        >

                          {

                            isCompleted

                            ?

                            "Completed"

                            :

                            isCurrent &&
                            isRunning

                            ?

                            isPaused

                              ?

                              "Paused"

                              :

                              "In Progress"

                            :

                            "Pending"
                          }

                        </div>

                      </div>
                    );
                  }
                )
              }

            </div>

          </div>

          {/* HEALTH */}

          <div className="dashboard-card large-card">

            <h2>
              Health Insights
            </h2>

            <div className="insight-box">

              <h3>
                Your Fitness Status
              </h3>

              <p>
                {getHealthMessage()}
              </p>

              <p
                style={{
                  marginTop:"15px"
                }}
              >

                <strong>
                  Health Risk:
                </strong>

                {" "}

                {getHealthRisk()}

              </p>

              <p
                style={{
                  marginTop:"10px"
                }}
              >

                <strong>
                  Recommended Workout:
                </strong>

                {" "}

                {
                  getWorkoutSuggestion()
                }

              </p>

            </div>

            {/* FITNESS */}

            <div className="progress-item">

              <div className="progress-label">

                <span>
                  Fitness Score
                </span>

                <span>
                  {fitnessScore}%
                </span>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:
                    `${fitnessScore}%`
                  }}
                ></div>

              </div>

            </div>

            {/* WORKOUT */}

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

        {/* DIET */}

        <div className="dashboard-card ai-diet-card">

          <div className="card-header">

            <div>

              <h2>
                Diet Recommendation
              </h2>

              <p className="ai-subtitle">

                Personalized nutrition
                guidance based on BMI

              </p>

            </div>

          </div>

          {/* GRID */}

          <div className="diet-grid">

            <div className="diet-stat">

              <h4>
                Calories
              </h4>

              <h1>
                {diet.calories}
              </h1>

            </div>

            <div className="diet-stat">

              <h4>
                Protein
              </h4>

              <h1>
                {diet.protein}
              </h1>

            </div>

            <div className="diet-stat">

              <h4>
                Carbs
              </h4>

              <h1>
                {diet.carbs}
              </h1>

            </div>

            <div className="diet-stat">

              <h4>
                Water
              </h4>

              <h1>
                {diet.water}
              </h1>

            </div>

          </div>

          {/* GOAL */}

          <div className="goal-box">

            <h3>
              Recommended Goal
            </h3>

            <p>

              {
                bmiCategory ===
                "Underweight"

                ?

                "Focus on muscle gain with calorie surplus and strength workouts."

                :

                bmiCategory ===
                "Normal"

                ?

                "Maintain balanced nutrition and regular workouts."

                :

                bmiCategory ===
                "Overweight"

                ?

                "Reduce body fat with calorie deficit and cardio exercises."

                :

                "Improve health through active lifestyle and weight reduction."
              }

            </p>

          </div>

          {/* MEALS */}

          <div className="meal-section">

            <h3>
              Suggested Meals
            </h3>

            <div className="meal-grid">

              {
                diet.meals.map(
                  (
                    meal,
                    index
                  ) => (

                  <div
                    key={index}
                    className="meal-item"
                  >

                    {meal}

                  </div>
                ))
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;