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
              <NavLink route="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://illustrious-peak-4c2.notion.site/Contact-Us-3017eced98738059ac71da25023415f1"
                target="_blank"
              >
                Contact
              </a>
            </li>
          </ul>
          <span className="bg-secondary-subtle opacity-75 p-1 rounded text-body navbar-text">
            © 2026 <strong>Abdallah Shahin</strong>. All rights reserved.
          </span>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
