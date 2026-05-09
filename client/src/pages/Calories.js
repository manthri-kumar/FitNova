import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Calories.css";

function Calories() {

  const navigate =
    useNavigate();

  const [food,
    setFood] =
    useState("");

  const [calories,
    setCalories] =
    useState("");

  const [foods,
    setFoods] =
    useState([]);

  /* ADD FOOD */

  const addFood = () => {

    if(
      food === "" ||
      calories === ""
    ){

      return;
    }

    setFoods([

      ...foods,

      {
        food,
        calories
      }

    ]);

    setFood("");
    setCalories("");
  };

  /* TOTAL */

  const totalCalories =

    foods.reduce(
      (
        total,
        item
      ) =>

      total +
      parseInt(item.calories),

      0
    );

  /* LOGOUT */

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <div className="calories-layout">

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

            <li
              onClick={() =>
                navigate("/dashboard")
              }
            >
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

            <li className="active">
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

      <div className="calories-page">

        {/* HEADER */}

        <div className="calories-header">

          <div>

            <h1>
              Calories Tracker
            </h1>

            <p>
              Track your daily calorie
              intake and nutrition
            </p>

          </div>

        </div>

        {/* INPUT BOX */}

        <div className="calorie-box">

          <input
            type="text"
            placeholder="Food Name"
            value={food}
            onChange={(e)=>
              setFood(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e)=>
              setCalories(
                e.target.value
              )
            }
          />

          <button
            onClick={addFood}
          >
            Add Food
          </button>

        </div>

        {/* TOTAL */}

        <div className="total-box">

          <h2>
            Total Calories
          </h2>

          <h1>
            {totalCalories} kcal
          </h1>

        </div>

        {/* FOOD LIST */}

        <div className="food-list">

          {
            foods.map(
              (
                item,
                index
              ) => (

              <div
                className="food-card"
                key={index}
              >

                <div className="food-icon">
                  🍎
                </div>

                <h3>
                  {item.food}
                </h3>

                <p>
                  {item.calories} kcal
                </p>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Calories;