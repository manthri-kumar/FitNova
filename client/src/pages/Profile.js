// Profile.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Profile.css";

function Profile() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({

    age: "",

    gender: "",

    height: "",

    weight: "",

    goal: "",

    activityLevel: ""
  });

  useEffect(() => {

    if (!user) {

      navigate("/");
      return;
    }

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const response =
        await fetch(
          `http://localhost:5000/api/profile/${user._id}`
        );

      const data = await response.json();

      if (data) {

        setFormData({

          age: data.age || "",

          gender: data.gender || "",

          height: data.height || "",

          weight: data.weight || "",

          goal: data.goal || "",

          activityLevel: data.activityLevel || ""
        });
      }

    } catch (err) {

      console.log(err);
    }
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {

    try {

      const response = await fetch(

        "http://localhost:5000/api/profile/save",

        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            userId: user._id,

            ...formData
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Profile Saved Successfully");
      }
      else {

        alert(data.message || "Failed to save");
      }

    } catch (err) {

      console.log(err);

      alert("Server Error");
    }
  };

  return (

    <div className="profile-page">

      {/* SIDEBAR */}

      <div className="profile-sidebar">

        <h1 className="profile-logo">
          FitNova
        </h1>

        <p className="profile-tagline">
          Premium Fitness Dashboard
        </p>

        <ul className="profile-menu">

          <li onClick={() => navigate("/dashboard")}>
            Dashboard
          </li>

          <li className="active-profile">
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

        <button
          className="profile-logout"
          onClick={() => {

            localStorage.clear();

            navigate("/");
          }}
        >
          Logout
        </button>

      </div>

      {/* MAIN */}

      <div className="profile-main">

        <div className="profile-header">

          <div>

            <h1>
              My Profile
            </h1>

            <p>
              Update your fitness information
            </p>

          </div>

          <div className="profile-avatar">

            {
              user?.username
              ? user.username.charAt(0).toUpperCase()
              : "U"
            }

          </div>

        </div>

        {/* CARD */}

        <div className="profile-card">

          <div className="profile-grid">

            <div className="input-group">

              <label>
                Age
              </label>

              <input
                type="number"
                name="age"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >

                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

              </select>

            </div>

            <div className="input-group">

              <label>
                Height
              </label>

              <input
                type="number"
                name="height"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>
                Weight
              </label>

              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>
                Goal
              </label>

              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
              >

                <option value="">
                  Select Goal
                </option>

                <option value="Weight Loss">
                  Weight Loss
                </option>

                <option value="Muscle Gain">
                  Muscle Gain
                </option>

                <option value="Maintain Fitness">
                  Maintain Fitness
                </option>

              </select>

            </div>

            <div className="input-group">

              <label>
                Activity Level
              </label>

              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
              >

                <option value="">
                  Activity Level
                </option>

                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>

              </select>

            </div>

          </div>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;