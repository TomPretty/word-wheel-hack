import { Letter, OuterLetters } from '@puzzles/word-wheel-types';

export function padOuterLetters(letters: Letter[]): OuterLetters {
  const padded: OuterLetters = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];

  letters.forEach((l, index) => {
    padded[index] = l;
  });

  return padded;
}
