import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LogIn from './pages/auth/LogIn';
import Register from './pages/auth/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
