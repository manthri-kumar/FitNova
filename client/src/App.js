// App.js

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/* PAGES */

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import WorkoutPlans from "./pages/WorkoutPlans";
import Calories from "./pages/Calories";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* SIGNUP */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* WORKOUT PLANS */}

        <Route
          path="/workouts"
          element={<WorkoutPlans />}
        />

        {/* CALORIES */}

        <Route
          path="/calories"
          element={<Calories />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;