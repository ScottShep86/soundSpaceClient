import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const IsPrivate = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

IsPrivate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsPrivate;
