import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <nav className="header">
        <div className="link" style={{ fontSize: "23px" }}>
          <Link to="/">Home</Link>
          <Link to="/dataManagement">Management </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
