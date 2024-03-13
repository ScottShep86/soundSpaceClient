import Header from '../components/Header';
import Footer from '../components/Footer';
// import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import './Layout.css';

// export default function Layout({ children }) {
//   return (
//     <div>
//       <Header />
//       <main>{children}</main>
//       <Footer />
//     </div>
//   );
// }

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
