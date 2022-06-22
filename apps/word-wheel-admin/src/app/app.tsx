import { Container } from '@guardian/source-react-components';
import { WordWheelCreateRequest } from '@puzzles/word-wheel-types';
import { useState } from 'react';
import { WordWheelForm } from './WordWheelForm';
import { WordWheelSummary } from './WordWheelSummary';

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
              <button onClick={saveDefinition}>Save</button>
            </div>
          </section>
        )}
      </main>
    </Container>
  );
}

export default App;
