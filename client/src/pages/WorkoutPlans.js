import { useNavigate } from "react-router-dom";

import "../styles/WorkoutPlans.css";

function WorkoutPlans() {

  const navigate =
    useNavigate();

  const workouts = [

    {
      title:"Fat Burn HIIT",
      duration:"30 mins",
      level:"Intermediate",
      calories:"350 kcal",
      description:
      "High intensity interval training for rapid fat burn.",
      icon:"🔥"
    },

    {
      title:"Strength Training",
      duration:"45 mins",
      level:"Advanced",
      calories:"500 kcal",
      description:
      "Build muscle strength and endurance.",
      icon:"💪"
    },

    {
      title:"Yoga Flexibility",
      duration:"25 mins",
      level:"Beginner",
      calories:"150 kcal",
      description:
      "Improve flexibility and reduce stress.",
      icon:"🧘"
    },

    {
      title:"Cardio Blast",
      duration:"40 mins",
      level:"Intermediate",
      calories:"420 kcal",
      description:
      "Boost heart health and stamina.",
      icon:"🏃"
    }

  ];

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <div className="workout-layout">

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

            <li className="active">
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

      <div className="workout-page">

        {/* HEADER */}

        <div className="workout-header">

          <div>

            <h1>
              Workout Plans
            </h1>

            <p>
              AI powered workout plans
            </p>

          </div>

        </div>

        {/* GRID */}

        <div className="workout-grid">

          {
            workouts.map(
              (
                workout,
                index
              ) => (

              <div
                className="workout-card"
                key={index}
              >

                <div className="workout-icon">

                  {workout.icon}

                </div>

                <h2>

                  {workout.title}

                </h2>

                <p>

                  {workout.description}

                </p>

                <div className="workout-details">

                  <span>
                    ⏱ {workout.duration}
                  </span>

                  <span>
                    🔥 {workout.calories}
                  </span>

                </div>

                <div className="level">

                  {workout.level}

                </div>

                <button className="start-btn">

                  Start Workout

                </button>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default WorkoutPlans;