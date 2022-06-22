import { wordWheelDefinitionFactory } from '@puzzles/word-wheel-types-factories';
import { TrieSolver } from './trie-solver';
import { padOuterLetters } from '../spec-helpers';

describe('solve', () => {
  it('finds all of the valid words', () => {
    const definition = wordWheelDefinitionFactory.build({
      centerLetter: 'C',
      outerLetters: padOuterLetters(['A', 'P', 'T']),
    });
    const dictionary = ['CAP', 'CAT'];
    const solver = new TrieSolver(dictionary);

    const found = solver.solve(definition).sort();

    expect(found).toEqual(dictionary);
  });

  it("doesn't find words that don't use the center letter", () => {
    const definition = wordWheelDefinitionFactory.build({
      centerLetter: 'X',
      outerLetters: padOuterLetters(['C', 'A', 'P']),
    });
    const dictionary = ['CAP'];
    const solver = new TrieSolver(dictionary);

    const found = solver.solve(definition);

    expect(found).toEqual([]);
  });

  // This test case is in response to a bug found during implementing the solver.
  // The solver was using the original set of available letters to construct the
  // available letters for the next iteration. This meant the first iteration would
  // have 9 available letters, and all future iterations would have 8 available
  // letters (the original 9 minus the one just used). This meant if there were multiple
  // of the same letter (e.g 2 Es), the solver would effectively have an infinite number
  // of that letter.
  it("doesn't use multiple occurances of a letter too many times", () => {
    const definition = wordWheelDefinitionFactory.build({
      centerLetter: 'E',
      outerLetters: padOuterLetters(['E', 'R', 'I']),
    });
    const dictionary = ['EERIE'];
    const solver = new TrieSolver(dictionary);

    const found = solver.solve(definition);

    expect(found).toEqual([]);
  });
});
