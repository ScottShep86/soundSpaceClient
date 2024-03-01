import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();

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
      console.log('Data received from API:', data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  return (
    <div>
      {userData && (
        <div>
          <h1>Hello {userData.firstName}</h1>
          <img
            src={userData.picture}
            alt={`${userData.firstName} ${userData.lastName}`}
          />
          <p>
            {userData.firstName} {userData.lastName}
          </p>
          <p>{userData.location}</p>
        </div>
      )}
    </div>
  );
}
