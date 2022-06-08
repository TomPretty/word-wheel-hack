import { Letter, OuterLetters } from '@puzzles/word-wheel-types';
import { wordWheelDefinitionFactory } from '@puzzles/word-wheel-types-factories';
import { solve } from './solver';

describe('solve', () => {
  it('finds all of the valid words', () => {
    const definition = wordWheelDefinitionFactory.build({
      centerLetter: 'C',
      outerLetters: padOuterLetters(['A', 'P', 'T']),
    });
    const dictionary = ['CAP', 'CAT'];

    const found = solve(definition, dictionary);

    expect(found).toEqual(dictionary);
  });

  it("doesn't find words that don't use the center letter", () => {
    const definition = wordWheelDefinitionFactory.build({
      centerLetter: 'X',
      outerLetters: padOuterLetters(['C', 'A', 'P']),
    });
    const dictionary = ['CAP'];

    const found = solve(definition, dictionary);

    expect(found).toEqual([]);
  });
});

// ---- Helpers ---- //

function padOuterLetters(letters: Letter[]): OuterLetters {
  const padded: OuterLetters = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];

  letters.forEach((l, index) => {
    padded[index] = l;
  });

  return padded;
}
