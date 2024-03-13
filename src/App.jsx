import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import LogIn from './pages/auth/LogIn';
import Register from './pages/auth/Register';
import Profile from './pages/user/Profile';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import CreateJob from './pages/job/CreateJob';
import OneJob from './pages/job/OneJob';
import AllJobs from './pages/job/AllJobs';
import EditJob from './pages/job/EditJob';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<Layout />}>
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
        <Route
          path="/jobs/create"
          element={
            <IsPrivate>
              <CreateJob />
            </IsPrivate>
          }
        />
        <Route path="/jobs/all" element={<AllJobs />} />
        <Route path="/jobs/:id" element={<OneJob />} />
        <Route path="/jobs/:id/edit" element={<EditJob />} />
      </Route>
    </Routes>
  );
}

export default App;
