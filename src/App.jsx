import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LogIn from './pages/auth/LogIn';
import Register from './pages/auth/Register';
import Profile from './pages/user/Profile';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          <IsAnon>
            <LogIn />
          </IsAnon>
        }
      />
      <Route
        path="/register"
        element={
          <IsAnon>
            <Register />
          </IsAnon>
        }
      />
      <Route
        path="/profile"
        element={
          <IsPrivate>
            <Profile />
          </IsPrivate>
        }
      />
    </Routes>
  );
}

export default App;
