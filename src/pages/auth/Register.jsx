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
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
