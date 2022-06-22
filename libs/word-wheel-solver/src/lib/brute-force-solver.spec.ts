import { wordWheelDefinitionFactory } from '@puzzles/word-wheel-types-factories';
import { BruteForceSolver } from './brute-force-solver';
import { padOuterLetters } from '../spec-helpers';

describe('solve', () => {
  it('finds all of the valid words', () => {
    const definition = wordWheelDefinitionFactory.build({
      centerLetter: 'C',
      outerLetters: padOuterLetters(['A', 'P', 'T']),
    });
    const dictionary = ['CAP', 'CAT'];
    const solver = new BruteForceSolver(dictionary);

    const found = solver.solve(definition);

    expect(found).toEqual(dictionary);
  });

  it("doesn't find words that don't use the center letter", () => {
    const definition = wordWheelDefinitionFactory.build({
      centerLetter: 'X',
      outerLetters: padOuterLetters(['C', 'A', 'P']),
    });
    const dictionary = ['CAP'];
    const solver = new BruteForceSolver(dictionary);

    const found = solver.solve(definition);

    expect(found).toEqual([]);
  });
});
