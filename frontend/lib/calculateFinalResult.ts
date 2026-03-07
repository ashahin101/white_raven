import type { ReaderResults } from '~/components/StoryDiv/StoryCtx';
import { getPersonalities } from './service/personalities';

export async function calculateFinalResult(
  userInput: ReaderResults['results'],
) {
  const personalities = await getPersonalities();

  if (!personalities?.length) return;

  const finalCode =
    findMostRepeated(userInput['E/I']) +
    findMostRepeated(userInput['S/N']) +
    findMostRepeated(userInput['T/F']) +
    findMostRepeated(userInput['P/J']);

  const personalityObj = personalities.find((el) => el.id === finalCode);

  console.log(finalCode, personalityObj);
  return personalityObj;
}

function findMostRepeated(arr: string[] = []) {
  const countMap: { [k: string]: number } = {};

  for (const item of arr) {
    // Count frequency
    countMap[item] = (countMap[item] || 0) + 1;
  }

  const keysArr = Object.keys(countMap);
  let maxFrequencyKey = keysArr[0];

  for (const key of keysArr) {
    if (countMap[key] > countMap[maxFrequencyKey]) {
      maxFrequencyKey = key;
    }
  }

  return maxFrequencyKey;
}
