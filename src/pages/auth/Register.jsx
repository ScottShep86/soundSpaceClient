import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [picture, setPicture] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [pictureFocused, setPictureFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const handleFileUpload = async event => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'a8gbixfl');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dzvlf5x2i/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        const pictureUrl = data.secure_url;
        setPicture(pictureUrl);
      } else {
        console.error('Failed to upload image to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const handleRegisterSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const requestBody = {
      firstName,
      lastName,
      picture: picture,
      location,
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/auth/register`,
        requestBody
      );
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      if (error) {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      }
    }
  };

  return (
    <div className="authPageView">
      <h1>Register</h1>
      <form onSubmit={handleRegisterSubmit}>
        <div
          className={`input-wrapper ${
            firstNameFocused || firstName ? 'focused' : ''
          }`}
        >
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            onFocus={() => setFirstNameFocused(true)}
            onBlur={() => !firstName && setFirstNameFocused(false)}
            required
          />
          <label>First Name</label>
        </div>
        <div
          className={`input-wrapper ${
            lastNameFocused || lastName ? 'focused' : ''
          }`}
        >
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            onFocus={() => setLastNameFocused(true)}
            onBlur={() => !lastName && setLastNameFocused(false)}
            required
          />
          <label>Last Name</label>
        </div>
        <div
          className={`input-wrapper profile-picture-wrapper ${
            pictureFocused || picture ? 'focused' : ''
          }`}
        >
          <input
            type="file"
            onChange={e => handleFileUpload(e)}
            onFocus={() => setPictureFocused(true)}
            onBlur={() => !picture && setPictureFocused(false)}
            id="file"
          />
          <label
            className={`profile-picture-label ${picture ? 'filled' : ''}`}
            style={{
              position: 'absolute',
              top: '0',
              left: '10px',
              fontSize: '12px',
              color: 'white',
              backgroundColor: 'black',
              borderBottom: 'none',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
            }}
          >
            Profile Picture
          </label>
        </div>

        <div
          className={`input-wrapper ${
            locationFocused || location ? 'focused' : ''
          }`}
        >
          <input
            type="text"
            name="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            onFocus={() => setLocationFocused(true)}
            onBlur={() => !location && setLocationFocused(false)}
          />
          <label>Location</label>
        </div>
        <div
          className={`input-wrapper ${emailFocused || email ? 'focused' : ''}`}
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => !email && setEmailFocused(false)}
            required
          />
          <label>Email Address</label>
        </div>
        <div
          className={`input-wrapper ${
            passwordFocused || password ? 'focused' : ''
          }`}
        >
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => !password && setPasswordFocused(false)}
            required
          />
          <label>Password</label>
        </div>
        <div
          className={`input-wrapper ${
            confirmPasswordFocused || confirmPassword ? 'focused' : ''
          }`}
        >
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            onFocus={() => setConfirmPasswordFocused(true)}
            onBlur={() => !confirmPassword && setConfirmPasswordFocused(false)}
            required
          />
          <label>Confirm Password</label>
        </div>
        <button className="formBtn" type="submit">
          Register
        </button>
      </form>
      <p>Already a User?</p>
      <Link className="authLink" to={'/login'}>
        LogIn to your account
      </Link>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
