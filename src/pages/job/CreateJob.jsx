import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateJob() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    const requestBody = {
      title,
      location,
      jobType,
      jobRole,
      description,
      contactNumber,
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/jobs`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        navigate('/profile');
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleJobTypeChange = event => {
    const selectedJobType = event.target.value;
    setJobType(selectedJobType);
  };

  return (
    <div>
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Job Title:{' '}
          <input
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </label>
        <label>
          Location:{' '}
          <input
            type="text"
            placeholder="which City"
            value={location}
            onChange={event => setLocation(event.target.value)}
            required
          />
        </label>
        <label>
          Job Type:{' '}
          <select value={jobType} onChange={handleJobTypeChange} required>
            <option value="">Please Select</option>
            <option value="Studio">Studio</option>
            <option value="Live">Live</option>
          </select>
        </label>
        {jobType && (
          <label>
            Job Role:{' '}
            <select
              value={jobRole}
              onChange={event => setJobRole(event.target.value)}
            >
              <option value="">Please Select</option>
              {jobType === 'Studio' ? (
                <>
                  <option value="Producer">Producer</option>
                  <option value="Mixing Engineer">Mixing Engineer</option>
                  <option value="Mastering Engineer">Mastering Engineer</option>
                  <option value="Songwriter">Songwriter</option>
                  <option value="Beatmaker">Beatmaker</option>
                </>
              ) : (
                <>
                  <option value="Musician">Musician</option>
                  <option value="Sound Technician">Sound Technician</option>
                  <option value="Light Technician">Light Technician</option>
                  <option value="Stage Manager">Stage Manager</option>
                  <option value="Production Manager">Production Manager</option>
                  <option value="Road Crew">Road Crew</option>
                </>
              )}
            </select>
          </label>
        )}
        <label>
          Description:{' '}
          <textarea
            name="description"
            placeholder="Please give a description of the available Job"
            cols="30"
            rows="10"
            value={description}
            onChange={event => setDescription(event.target.value)}
            required
          />
        </label>
        <label>
          Contact Number:{' '}
          <input
            type="text"
            placeholder="incl. Country code"
            value={contactNumber}
            onChange={event => setContactNumber(event.target.value)}
          />
        </label>
        <button type="submit">
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          Post a Job
        </button>
      </form>
    </div>
  );
}

export default CreateJob;
