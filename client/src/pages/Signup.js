// Signup.jsx

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Auth.css";

import fitnessImage from "../assets/fitness.png";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    username: "",
    email: "",
    password: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });

  };

  const handleSignup = async (e) => {

    e.preventDefault();

    try{

      const response = await fetch("http://localhost:5000/api/auth/signup", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)

      });

      const data = await response.json();

      if(response.ok){

        alert("Signup Successful");

        navigate("/");

      }
      else{
        alert(data.message);
      }

    }
    catch(error){

      console.log(error);

      alert("Server Error");

    }

  };

  return (

    <div className="main-container">

      <div className="login-container">

        {/* LEFT PANEL */}

        <div className="left-panel">

          <h1>Join FitNova</h1>

          <p>
            Create your account and start tracking workouts,
            BMI, calories, and your complete fitness progress.
          </p>

          <Link to="/">

            <button className="register-btn">
              Login
            </button>

          </Link>

          <img
            src={fitnessImage}
            alt="Fitness"
            className="fitness-image"
          />

        </div>

        {/* RIGHT PANEL */}

        <div className="right-panel">

          <h1>Signup</h1>

          <form onSubmit={handleSignup} autoComplete="off">

            {/* USERNAME */}

            <div className="input-box">

              <i className='bx bx-user'></i>

              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
                required
              />

            </div>

            {/* EMAIL */}

            <div className="input-box">

              <i className='bx bx-envelope'></i>

              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="new-email"
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="input-box">

              <i className='bx bx-lock-alt'></i>

              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Signup
            </button>

          </form>

          <p className="social-text">
            Begin your healthy lifestyle today
          </p>

        </div>

      </div>

    </div>

  );
}

export default Signup;