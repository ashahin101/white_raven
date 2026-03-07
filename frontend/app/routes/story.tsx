import { StoryCtxProvider } from '~/components/StoryDiv/StoryCtx';
import type { Route } from './+types/story';
import Navbar from '~/components/Navbar/Navbar';
import StoryDiv from '~/components/StoryDiv/StoryDiv';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Story Reading' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <StoryCtxProvider>
      <StoryDiv />
    </StoryCtxProvider>
  );
}
