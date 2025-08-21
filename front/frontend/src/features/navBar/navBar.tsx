import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./navBar.css";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home" className="nav-link">Home</Link>
      </div>
      <div className="navbar-links">
        <div 
          className="user-icon-wrapper"
          onClick={() => navigate('/profile')}
          title="Profile"
        >
          <FaUserCircle size={28} />
        </div>
        
        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
export default NavBar;
