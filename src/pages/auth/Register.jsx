import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [picture, setPicture] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

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

  const handleFileUpload = async event => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('imageUrl', file); // 'imageUrl' should match the key expected by the backend

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/auth/register`, // Check the correct API URL for uploading images
        formData
      );
      console.log(response.data); // Log the response data to check if the URL is present
      const pictureUrl = response.data.url; // Assuming the URL is returned in 'url' property
      setPicture(pictureUrl);
    } catch (error) {
      console.log('Error while uploading the file: ', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegisterSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        </label>
        <label>
          Profile Picture:
          <input type="file" onChange={e => handleFileUpload(e)} id="file" />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Location"
          />
        </label>
        <label>
          E-Mail:
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="E-Mail Adress"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </label>
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
