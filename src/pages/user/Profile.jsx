import './Profle.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [userJobs, setUserJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = localStorage.getItem('authToken');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/auth/profile/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        const data = await response.data;
        setUserData(data);

        const jobResponse = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/jobs?createdBy=${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        const jobs = await jobResponse.data;
        setUserJobs(jobs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [user]);

  // const handleLogOut = () => {
  //   logOutUser();
  // };

  const handleDeleteJob = async jobId => {
    setJobToDelete(jobId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    const storedToken = localStorage.getItem('authToken');
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_API_URL}/api/jobs/${jobToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setUserJobs(userJobs.filter(job => job._id !== jobToDelete));
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setJobToDelete(null);
  };

  return (
    <div>
      {userData && (
        <div>
          <div className="user-card">
            <img
              src={userData.picture}
              alt={`${userData.firstName} ${userData.lastName}`}
            />
            <div className="info">
              <h4>
                {userData.firstName} {userData.lastName}
              </h4>
              <h5>{userData.location}</h5>
            </div>
          </div>
          {/* <button onClick={handleLogOut}>Logout</button> */}
          {/* <Link to={`/profile/${userData._id}/edit`}>Edit Profile</Link> */}
          <div className="profile-links">
            <Link className="profile-link" to={`/jobs/create`}>
              Add a Job
            </Link>
            <Link className="profile-link" to={`/jobs/all`}>
              All Jobs
            </Link>
          </div>
          <h2>Jobs Posted by You</h2>
          {userJobs.length === 0 ? (
            <p>You currently have no posted jobs.</p>
          ) : (
            <ul>
              {userJobs
                .slice()
                .reverse()
                .map(job => (
                  <li key={job._id}>
                    <Link to={`/jobs/${job._id}`}>
                      <h3>{job.title}</h3>
                    </Link>
                    <button
                      className="editBtn"
                      // onClick={() => handleDeleteJob(job._id)}
                    >
                      <Link
                        className="profileLink"
                        to={{ pathname: `/jobs/${job._id}/edit` }}
                      >
                        Edit Job
                      </Link>
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={() => handleDeleteJob(job._id)}
                    >
                      Delete Job
                    </button>
                    {showModal && (
                      <ConfirmationModal
                        message="Are you sure you want to delete this job? This action cannot be undone."
                        onConfirm={confirmDelete}
                        onCancel={cancelDelete}
                      />
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
