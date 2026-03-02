import type { Route } from './+types/home2';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home2() {
  return (
    <>
      22222222222222222
      <Welcome />
    </>
  );
}
