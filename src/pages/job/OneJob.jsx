import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LiveIcon from '../../assets/images/jobType/Live.svg';
import StudioIcon from '../../assets/images/jobType/Studio.svg';

export default function OneJob() {
  const { id } = useParams();
  const [job, setJob] = useState();
  const { storeToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchJob = async () => {
      const storedToken = localStorage.getItem('authToken');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/jobs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        if (response.status === 200) {
          const parsed = response.data;
          setJob(parsed);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [id, storeToken]);

  const renderJobTypeIcon = () => {
    if (job.jobType === 'Live') {
      return <img src={LiveIcon} alt="Live" style={{ width: '70px' }} />;
    } else if (job.jobType === 'Studio') {
      return <img src={StudioIcon} alt="Studio" style={{ width: '70px' }} />;
    } else {
      return <p>{job.jobType}</p>;
    }
  };

  return (
    <div>
      {job && (
        <div>
          <h2>Job Details: {job.title}</h2>
          <p>Location: {job.location}</p>
          <p>Job Type: {renderJobTypeIcon()}</p>
          <p>Job Role: {job.jobRole}</p>
          <p>Description: {job.description}</p>
          <p>Contact Number: {job.contactNumber}</p>
        </div>
      )}
    </div>
  );
}
