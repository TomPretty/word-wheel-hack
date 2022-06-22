import { WordWheelDefinition } from '@puzzles/word-wheel-types';

export abstract class Solver {
  abstract solve(definition: WordWheelDefinition): string[];
}
