import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditJob() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const localToken = localStorage.getItem('authToken');
        if (!localToken) return;

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/jobs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          }
        );

        if (response.status === 200) {
          const parsed = response.data;
          setTitle(parsed.title);
          setLocation(parsed.location);
          setJobType(parsed.jobType);
          setJobRole(parsed.jobRole);
          setDescription(parsed.description);
          setContactNumber(parsed.contactNumber);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const localToken = localStorage.getItem('authToken');
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_API_URL}/api/jobs/${id}/edit`,
        {
          title,
          location,
          jobType,
          jobRole,
          description,
          contactNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localToken}`,
          },
        }
      );

      if (response.status === 200) {
        navigate('/profile');
      } else {
        const errorResponse = response.data;
        setErrorMessage(errorResponse.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleJobTypeChange = event => {
    const selectedJobType = event.target.value;
    setJobType(selectedJobType);
  };

  return (
    <div className="authPageView">
      <h2>Edit job</h2>
      <form onSubmit={handleSubmit}>
        <div className={`input-wrapper ${title ? 'focused' : ''}`}>
          <label>Job Title:</label>
          <input
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div className={`input-wrapper ${location ? 'focused' : ''}`}>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={event => setLocation(event.target.value)}
            required
          />
        </div>
        <div className={`input-wrapper ${jobType ? 'focused' : ''}`}>
          <label>Job Type:</label>
          <select value={jobType} onChange={handleJobTypeChange} required>
            <option value="">Please Select</option>
            <option value="Studio">Studio</option>
            <option value="Live">Live</option>
          </select>
        </div>
        {jobType && (
          <div className={`input-wrapper ${jobRole ? 'focused' : ''}`}>
            <label>Job Role:</label>
            <select
              value={jobRole}
              onChange={event => setJobRole(event.target.value)}
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
        <div className={`input-wrapper ${description ? 'focused' : ''}`}>
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
            cols="60"
            rows="8"
            value={description}
            onChange={event => setDescription(event.target.value)}
            required
          />
        </div>
        <div className={`input-wrapper ${contactNumber ? 'focused' : ''}`}>
          <label>Contact Number:</label>
          <input
            type="text"
            value={contactNumber}
            onChange={event => setContactNumber(event.target.value)}
          />
        </div>
        <button className="formBtn" type="submit">
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          UPDATE
        </button>
      </form>
    </div>
  );
}

export default EditJob;
