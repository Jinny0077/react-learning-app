import { Link } from "react-router-dom";
import "./header.css";
import DarkMode from "../../store/reducer/darkMode";

const Header = () => {
  return (
    <header>
      <nav className="header">
        <div className="link-container">
          <div className="link">
            <Link to="/">Home</Link>
            <Link to="/dataManagement">Management </Link>
          </div>
          <div className="dark-mode">
            <DarkMode />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
