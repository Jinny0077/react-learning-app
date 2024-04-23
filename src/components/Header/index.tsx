import { Link } from "react-router-dom";
import "./header.css";
import DarkMode from "../../store/reducer/darkMode";

const Header = () => {
  return (
    <header>
      <nav className="header">
        <div
          className="link"
          style={{
            fontSize: "23px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/dataManagement">Management </Link>
        </div>
        <div style={{ marginLeft: "900px" }}>
          <DarkMode />
        </div>
      </nav>
    </header>
  );
};

export default Header;
