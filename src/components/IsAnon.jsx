import { useContext } from 'react';
import PropTypes from 'prop-types';
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

IsAnon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsAnon;
