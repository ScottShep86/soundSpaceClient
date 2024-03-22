import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const setOpenedState = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.classList.toggle('active');
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        soundSpace
      </Link>

      <div
        className={isOpen ? 'menu-button-open' : 'menu-button'}
        onClick={() => {
          setOpenedState();
          toggleDropdown();
        }}
      >
        <div className="menu-button-burger"></div>
      </div>

      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <Link
              to="/profile"
              className="navbar-link"
              onClick={() => {
                setOpenedState();
                toggleDropdown();
              }}
            >
              My Profile
            </Link>
            <Link
              to="/jobs/all"
              className="navbar-link"
              onClick={() => {
                setOpenedState();
                toggleDropdown();
              }}
            >
              All Jobs
            </Link>
            <Link to="/" className="navbar-link" onClick={logOutUser}>
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="navbar-link"
              onClick={() => {
                setOpenedState();
                toggleDropdown();
              }}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="navbar-link"
              onClick={() => {
                setOpenedState();
                toggleDropdown();
              }}
            >
              Log In
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
