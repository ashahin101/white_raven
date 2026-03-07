import type { Personality } from '@shared/models';
type Personalities = Personality[];

// Get personalities data
export async function getPersonalities() {
  try {
    const res = await fetch('http://localhost:8081/personalities');
    const personalities: Personalities = await res.json();

    return personalities;
  } catch (error) {
    console.error('Failed to load personalities.json', error);
  }
}
