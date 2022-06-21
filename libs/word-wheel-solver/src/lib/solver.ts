import { Letter, WordWheelDefinition } from '@puzzles/word-wheel-types';

export function solve(
  definition: WordWheelDefinition,
  dictionary: string[]
): string[] {
  const dict = new Set(dictionary);

  function _solve(used: Letter[], available: Letter[]): Set<string> {
    const words = new Set<string>();

    if (used.includes(definition.centerLetter)) {
      const word = used.join('');

      if (dict.has(word)) {
        words.add(word);
      }
    }

    available.forEach((letter, i) => {
      const newWords = _solve(
        [...used, letter],
        [...available.slice(0, i), ...available.slice(i + 1)]
      );

      newWords.forEach((word) => words.add(word));
    });

    return words;
  }

  return [..._solve([], [definition.centerLetter, ...definition.outerLetters])];
}
