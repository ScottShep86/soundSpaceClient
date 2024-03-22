import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import LiveIcon from '../../assets/images/jobType/Live.svg';
import StudioIcon from '../../assets/images/jobType/Studio.svg';
import JobMessage from '../../components/JobMessage';

export default function OneJob() {
  const { id } = useParams();
  const [job, setJob] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [shouldCheckNew, setShouldCheckNew] = useState(1);
  const { storeToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem('authToken');

      try {
        const jobResponse = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/jobs/${id}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );

        const messagesResponse = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/messages/${id}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );

        const usersResponse = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/users`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );

        if (
          jobResponse.status === 200 &&
          messagesResponse.status === 200 &&
          usersResponse.status === 200
        ) {
          setJob(jobResponse.data);
          setMessages(messagesResponse.data);
          setUsers(usersResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, storeToken, shouldCheckNew]);

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
      <Link to="/jobs/all">Back to all jobs</Link>

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
      <JobMessage
        shouldCheckNew={shouldCheckNew}
        setShouldCheckNew={setShouldCheckNew}
      />
      <h3>Last messages:</h3>

      {messages.length === 0 ? (
        <p>Currently no messages</p>
      ) : (
        messages
          .slice()
          .reverse()
          .map(message => (
            <div key={message._id}>
              {users.map(u => {
                if (!message.createdBy.includes(u._id)) {
                  return null;
                }
                return (
                  <div key={u._id}>
                    <h4>
                      {u.firstName} {u.lastName}
                    </h4>
                  </div>
                );
              })}
              <p>{message.comment}</p>
              <p>
                {`Sent at ${message.created.slice(
                  11,
                  16
                )} on ${message.created.slice(8, 10)}.${message.created.slice(
                  5,
                  7
                )}.${message.created.slice(2, 4)}`}
              </p>
              <br />
            </div>
          ))
      )}
    </div>
  );
}
