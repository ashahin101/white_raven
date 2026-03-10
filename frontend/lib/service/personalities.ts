import type { Personality } from '@shared/models';
type Personalities = Personality[];

// Get personalities data
export async function getPersonalities() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}personalities`);
    const personalities: Personalities = await res.json();

    return personalities;
  } catch (error) {
    console.error('Failed to load personalities.json', error);
  }
}
