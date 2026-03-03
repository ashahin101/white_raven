import { Link } from 'react-router';

export function Navbar() {
  return (
    <nav className="sticky-top bg-body-tertiary navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="text-light-emphasis navbar-brand fw-bold" href="./">
          Nexus
        </a>
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
              <Link className="nav-link active" aria-current="page" to="./">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/about">
                About-Us
              </Link>
            </li>
          </ul>
          <span className="navbar-text">Nexus | Interactive Fiction</span>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
