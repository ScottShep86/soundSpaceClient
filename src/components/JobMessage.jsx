import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function JobMessage({ shouldCheckNew, setShouldCheckNew }) {
  const [comment, setComment] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useContext(AuthContext);

  const { id } = useParams();

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/messages`,
        {
          comment,
          jobId: id,
          createdBy: user._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        event.target.reset();
        setComment('');
        setShouldCheckNew(shouldCheckNew + 1);
      } else {
        const errorResponse = await response.data;
        setErrorMessage(errorResponse.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <h4>Message me if you are interested...</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          cols="30"
          rows="10"
          value={comment}
          onChange={event => setComment(event.target.value)}
          required
        />

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <div className="authSection">
          <br></br>
          <button className="formBtn" type="submit">
            Submit Message
          </button>
          <br></br>
        </div>
      </form>
    </div>
  );
}

JobMessage.propTypes = {
  shouldCheckNew: PropTypes.any,
  setShouldCheckNew: PropTypes.func,
};
