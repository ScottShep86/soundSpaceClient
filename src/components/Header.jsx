import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        soundSpace
      </Link>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <Link to="/jobs/all" className="navbar-link">
              Jobs
            </Link>
            <Link to="/profile" className="navbar-link">
              My Profile
            </Link>
            <Link to="/" className="navbar-link" onClick={logOutUser}>
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="navbar-link">
              Sign Up
            </Link>
            <Link to="/login" className="navbar-link">
              Log In
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
