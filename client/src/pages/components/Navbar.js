import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {

  const location = useLocation();

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <nav className="navbar">

      {/* LEFT */}

      <div className="nav-left">

        <h1 className="logo">
          FitNova
        </h1>

      </div>

      {/* CENTER */}

      <div className="nav-center">

        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard"
              ? "active-nav"
              : ""
          }
        >
          Dashboard
        </Link>

        <Link
          to="/profile"
          className={
            location.pathname === "/profile"
              ? "active-nav"
              : ""
          }
        >
          Profile
        </Link>

        <Link
          to="/workouts"
          className={
            location.pathname === "/workouts"
              ? "active-nav"
              : ""
          }
        >
          Workouts
        </Link>

        <Link
          to="/progress"
          className={
            location.pathname === "/progress"
              ? "active-nav"
              : ""
          }
        >
          Progress
        </Link>

      </div>

      {/* RIGHT */}

      <div className="nav-right">

        <div className="user-box">

          <div className="user-avatar">

            {
              user?.username
              ? user.username.charAt(0).toUpperCase()
              : "U"
            }

          </div>

          <span className="username">

            {
              user?.username || "User"
            }

          </span>

        </div>

        <button
          className="nav-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;