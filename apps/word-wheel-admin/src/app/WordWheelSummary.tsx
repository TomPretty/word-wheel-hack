import { TrieSolver } from '@puzzles/word-wheel-solver';
import { WordWheelDefinition } from '@puzzles/word-wheel-types';
import { useRef } from 'react';
import { WORDS } from '@puzzles/word-wheel-words';

interface WordWheelSummaryProps {
  definition: WordWheelDefinition;
}

export function WordWheelSummary({ definition }: WordWheelSummaryProps) {
  const solutions = useSolutions(definition);

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

// ---- Hooks ---- //

function useSolutions(definition: WordWheelDefinition) {
  const solverRef = useRef(new TrieSolver(WORDS));

  return solverRef.current.solve(definition);
}
