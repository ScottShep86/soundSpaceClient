import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const IsAnon = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  } else {
    return children;
  }
};

export default IsAnon;
