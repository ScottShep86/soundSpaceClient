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

  // Add state for tracking focus
  const [titleFocused, setTitleFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
  const [jobTypeFocused, setJobTypeFocused] = useState(false);
  const [jobRoleFocused, setJobRoleFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [contactNumberFocused, setContactNumberFocused] = useState(false);

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
    <div className="authPageView">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <div
          className={`input-wrapper ${titleFocused || title ? 'focused' : ''}`}
        >
          <label>Job Title:</label>
          <input
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
            onFocus={() => setTitleFocused(true)}
            onBlur={() => setTitleFocused(false)}
            title="Please enter a job title"
            required
          />
        </div>
        <div
          className={`input-wrapper ${
            locationFocused || location ? 'focused' : ''
          }`}
        >
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={event => setLocation(event.target.value)}
            onFocus={() => setLocationFocused(true)}
            onBlur={() => setLocationFocused(false)}
            required
          />
        </div>
        <div
          className={`input-wrapper ${
            jobTypeFocused || jobType ? 'focused' : ''
          }`}
        >
          <label
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
            Job Type:
          </label>
          <select
            value={jobType}
            onChange={handleJobTypeChange}
            onFocus={() => setJobTypeFocused(true)}
            onBlur={() => setJobTypeFocused(false)}
            required
          >
            <option value="">Please Select</option>
            <option value="Studio">Studio</option>
            <option value="Live">Live</option>
          </select>
        </div>
        {jobType && (
          <div
            className={`input-wrapper ${
              jobRoleFocused || jobRole ? 'focused' : ''
            }`}
          >
            <label
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
              Job Role:
            </label>
            <select
              value={jobRole}
              onChange={event => setJobRole(event.target.value)}
              onFocus={() => setJobRoleFocused(true)}
              onBlur={() => setJobRoleFocused(false)}
              required
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
          </div>
        )}
        <div
          className={`input-wrapper ${
            descriptionFocused || description ? 'focused' : ''
          }`}
        >
          <label
            style={{
              position: 'absolute',
              top: '-6px',
              left: '10px',
              fontSize: '12px',
              color: 'white',
              backgroundColor: 'black',
              borderBottom: 'none',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
            }}
          >
            Description:
          </label>
          <textarea
            name="description"
            placeholder="Please give a description of the available Job"
            cols="60"
            rows="8"
            value={description}
            onChange={event => setDescription(event.target.value)}
            onFocus={() => setDescriptionFocused(true)}
            onBlur={() => setDescriptionFocused(false)}
            required
          />
        </div>
        <div
          className={`input-wrapper ${
            contactNumberFocused || contactNumber ? 'focused' : ''
          }`}
        >
          <label>Contact Number:</label>
          <input
            type="text"
            value={contactNumber}
            onChange={event => setContactNumber(event.target.value)}
            onFocus={() => setContactNumberFocused(true)}
            onBlur={() => setContactNumberFocused(false)}
          />
        </div>
        <button className="formBtn" type="submit">
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          Post a Job
        </button>
      </form>
    </div>
  );
}

export default CreateJob;
