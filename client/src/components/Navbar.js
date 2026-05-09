import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Fitness Coach</h2>

      <div>
        <Link style={styles.link} to="/">Login</Link>
        <Link style={styles.link} to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#111827",
    color: "white"
  },

  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: "20px",
    fontSize: "18px"
  }
};

export default Navbar;