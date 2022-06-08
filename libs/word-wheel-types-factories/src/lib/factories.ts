import { Factory } from 'fishery';
import { WordWheelDefinition } from '@puzzles/word-wheel-types';

export const wordWheelDefinitionFactory = Factory.define<WordWheelDefinition>(
  () => ({
    centerLetter: 'A',
    outerLetters: ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
  })
);
