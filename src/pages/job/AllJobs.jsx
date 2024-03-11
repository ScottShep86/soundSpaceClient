import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    fetchJobs();
  }, []);

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
        <Link key={job._id} to={`/jobs/${job._id}`}>
          <h3>{job.title}</h3>
          <h3>Location: {job.location}</h3>
          <p>{job.jobType}</p>
        </Link>
      ))}
    </div>
  );
}
