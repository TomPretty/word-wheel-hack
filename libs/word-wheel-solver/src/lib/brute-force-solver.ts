import { Letter, WordWheelDefinition } from '@puzzles/word-wheel-types';
import { Solver } from './solver';

export class BruteForceSolver extends Solver {
  #dictionary: Set<string>;

  constructor(words: string[]) {
    super();

    this.#dictionary = new Set(words);
  }

  solve(definition: WordWheelDefinition): string[] {
    const _solve = (used: Letter[], available: Letter[]): Set<string> => {
      const words = new Set<string>();

      if (used.includes(definition.centerLetter)) {
        const word = used.join('');

        if (this.#dictionary.has(word)) {
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
    };

    return [
      ..._solve([], [definition.centerLetter, ...definition.outerLetters]),
    ];
  }
}
