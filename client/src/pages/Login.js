// Login.jsx

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/Auth.css";

import fitnessImage from "../assets/fitness.png";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",

    password: ""
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(

        "http://localhost:5000/api/auth/login",

        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if(response.ok){

        /* STORE TOKEN */

        localStorage.setItem(
          "token",
          data.token
        );

        /* STORE USER */

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login Successful");

        navigate("/dashboard");
      }
      else{

        alert(data.message);
      }

    } catch(error){

      console.log(error);

      alert("Server Error");
    }
  };

  return (

    <div className="main-container">

      <div className="login-container">

        {/* LEFT PANEL */}

        <div className="left-panel">

          <h1>
            Join FitNova
          </h1>

          <img
            src={fitnessImage}
            alt="Fitness"
            className="fitness-image"
          />

          <p>
            Create your account and start
            tracking workouts, BMI,
            calories and your fitness
            journey.
          </p>

          <Link to="/signup">

            <button className="register-btn">

              Get Started

            </button>

          </Link>

        </div>

        {/* RIGHT PANEL */}

        <div className="right-panel">

          <h1>
            Login
          </h1>

          <form
            onSubmit={handleLogin}
            autoComplete="off"
          >

            {/* EMAIL */}

            <div className="input-box">

              <i className='bx bx-user'></i>

              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                required
              />

            </div>

            <p className="forgot">
              Forgot Password?
            </p>

            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>

          </form>

          <p className="social-text">
            Continue your fitness journey
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;