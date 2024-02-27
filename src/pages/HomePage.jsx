import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>SoundSpace</h1>
      <Link to={'/login'}>LOGIN</Link>
      <Link to={'/register'}>REGISTER</Link>
    </div>
  );
}
