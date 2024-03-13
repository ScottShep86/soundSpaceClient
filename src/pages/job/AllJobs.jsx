import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Assuming you have your AuthContext defined in a separate file

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoggedIn } = useContext(AuthContext); // Assuming you have isLoggedIn in your AuthContext

  const fetchJobs = async (searchTerm = '') => {
    try {
      let endpoint = `${import.meta.env.VITE_BASE_API_URL}/api/jobs/all`;
      if (searchTerm) {
        endpoint += `?search=${searchTerm}`;
      }
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        setJobs(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <h2>All Jobs</h2>
      <label>
        Search
        <input
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </label>
      {jobs.map(job => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <h3>Location: {job.location}</h3>
          <p>{job.jobType}</p>
          {isLoggedIn && <Link to={`/jobs/${job._id}`}>View Details</Link>}
        </div>
      ))}
    </div>
  );
}
