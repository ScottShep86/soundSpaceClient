import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

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
    <div>
      <h1>LogIn</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>
          Email Address:
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Email"
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
        <button type="submit">Log in now</button>
      </form>
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
    </div>
  );
}
