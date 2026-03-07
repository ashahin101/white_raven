import type React from 'react';
import { Link, useLocation } from 'react-router';

interface NavLinkProps extends React.PropsWithChildren {
  route: string;
}

const NavLink: React.FC<NavLinkProps> = (props) => {
  const location = useLocation();

  const styleActiveRoute = (route: string) =>
    route === location.pathname ? 'active' : '';
  return (
    <Link
      className={`nav-link ${styleActiveRoute(props.route)}`}
      aria-current="page"
      to={props.route}
    >
      {props.children}
    </Link>
  );
};

export function Navbar() {
  return (
    <nav className="sticky-top bg-body-tertiary navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="text-light-emphasis navbar-brand fw-bold" to="/">
          White_Raven
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="me-auto mb-2 mb-lg-0 navbar-nav">
            <li className="nav-item">
              <NavLink route="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink route="/story">Story</NavLink>
            </li>
            <li className="nav-item">
              <NavLink route="/about">About-Us</NavLink>
            </li>
          </ul>
          <span className="navbar-text">Nexus | Interactive Fiction</span>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
