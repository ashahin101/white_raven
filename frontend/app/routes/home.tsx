import type { Route } from './+types/home';
import Navbar from '~/components/Navbar/Navbar';
import { Link } from 'react-router';
import 'public/style/home.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <Navbar />
      <div id="landingImg">
        <div className="flex align-content-center h-100 text-center">
          <h2 className="text-white">Interactive Fiction Experience</h2>
          <h5 className="px-2 text-white fw-light">
            Step into stories you control - every choice shapes your adventure.
          </h5>
          <Link
            id="startBtn"
            to="/story"
            className="mt-3 px-1 border fs-4 btn btn-light"
          >
            {' Start '}
          </Link>
        </div>
      </div>
    </div>
  );
}
