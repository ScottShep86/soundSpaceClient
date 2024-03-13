import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = async event => {
    event.preventDefault();
    const requestBody = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/auth/login`,
        requestBody
      );
      if (response.status === 200) {
        const data = await response.data;
        storeToken(data.authToken);
        authenticateUser();
        navigate('/profile');
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
      <h1>LogIn</h1>
      <form onSubmit={handleLoginSubmit}>
        <div
          className={`input-wrapper ${emailFocused || email ? 'focused' : ''}`}
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => !email && setEmailFocused(false)} // Adjusted onBlur logic
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
            onBlur={() => !password && setPasswordFocused(false)} // Adjusted onBlur logic
            required
          />
          <label>Password</label>
        </div>
        <button className="formBtn" type="submit">
          Log in now
        </button>
      </form>
      <p>Not a User?</p>
      <Link className="authLink" to={'/register'}>
        Sign Up as a User
      </Link>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
