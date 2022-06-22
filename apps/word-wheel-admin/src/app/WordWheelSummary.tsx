import { trieSolve } from '@puzzles/word-wheel-solver';
import { WordWheelDefinition } from '@puzzles/word-wheel-types';

interface WordWheelSummaryProps {
  definition: WordWheelDefinition;
}

export function WordWheelSummary({ definition }: WordWheelSummaryProps) {
  const solutions = trieSolve(definition);

  return (
    <div>
      <dl>
        <dt>Center Letter</dt>
        <dd>{definition.centerLetter}</dd>

        <dt>Outer Letters</dt>
        <dd>{definition.outerLetters.join(', ')}</dd>

        <dt>Solutions</dt>
        <dd>{solutions.join(', ')}</dd>
      </dl>
    </div>
  );
}
