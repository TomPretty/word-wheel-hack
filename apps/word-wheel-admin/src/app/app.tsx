import { Container } from '@guardian/source-react-components';
import { trieSolve } from '@puzzles/word-wheel-solver';
import {
  WordWheelCreateRequest,
  WordWheelDefinition,
} from '@puzzles/word-wheel-types';
import { useState } from 'react';
import { WordWheelForm } from './WordWheelForm';

export function App() {
  const [createRequest, setCreateRequest] = useState<
    WordWheelCreateRequest | undefined
  >(undefined);

  async function saveDefinition() {
    if (!createRequest) {
      return;
    }

    const res = await fetch('/api/word-wheel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createRequest),
    });

    const json = await res.json();

    console.log('[API] - ', { json });
  }

  return (
    <Container>
      <header>
        <h1>Word Wheel Admin</h1>
      </header>

      <main>
        <section>
          <h2>Create Word Wheel</h2>

          <WordWheelForm onSubmit={setCreateRequest} />
        </section>

        {createRequest && (
          <section>
            <h2>Word Wheel</h2>

            <WordWheelSummary definition={createRequest.definition} />

            <div>
              <button onClick={() => saveDefinition()}>Save</button>
            </div>
          </section>
        )}
      </main>
    </Container>
  );
}

interface WordWheelSummaryProps {
  definition: WordWheelDefinition;
}

function WordWheelSummary({ definition }: WordWheelSummaryProps) {
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

export default App;
