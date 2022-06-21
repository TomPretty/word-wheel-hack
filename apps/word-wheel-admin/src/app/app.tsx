import { solve } from '@puzzles/word-wheel-solver';
import {
  WordWheelCreateRequest,
  Letter,
  WordWheelDefinition,
} from '@puzzles/word-wheel-types';
import { WORDS } from '@puzzles/word-wheel-words';
import { useState } from 'react';

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
    <div>
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
    </div>
  );
}

interface WordWheelFormProps {
  onSubmit: (createRequest: WordWheelCreateRequest) => void;
}

function WordWheelForm({ onSubmit }: WordWheelFormProps) {
  const [puzzleNumberInput, setPuzzleNumberInput] = useState('');
  const [centerLetter, setCenterLetter] = useState('');
  const [outerLetters, setOutterLetters] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
  });

  const onPuzzleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // check it's a number
    setPuzzleNumberInput(value);
  };

  const onCenterLetterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // check it's 1 character
    // check it's a letter
    setCenterLetter(value.toUpperCase());
  };

  const onOuterLetterChange =
    (letterId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      // check it's 1 character
      // check it's a letter
      setOutterLetters({ ...outerLetters, [letterId]: value.toUpperCase() });
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const puzzleNumber = parseInt(puzzleNumberInput);

    const definition: WordWheelDefinition = {
      centerLetter: centerLetter as Letter,
      outerLetters: [
        outerLetters[1] as Letter,
        outerLetters[2] as Letter,
        outerLetters[3] as Letter,
        outerLetters[4] as Letter,
        outerLetters[5] as Letter,
        outerLetters[6] as Letter,
        outerLetters[7] as Letter,
        outerLetters[8] as Letter,
      ],
    };

    onSubmit({ puzzleNumber, definition });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="center-letter">Puzzle number</label>
        <input
          id="puzzle-number"
          type="text"
          value={puzzleNumberInput}
          onChange={onPuzzleNumberChange}
        />
      </div>

      <div>
        <label htmlFor="center-letter">Center Letter</label>
        <input
          id="center-letter"
          type="text"
          value={centerLetter}
          onChange={onCenterLetterChange}
        />
      </div>

      <fieldset>
        <legend>Outer Letters</legend>

        <div>
          <label htmlFor="outer-letter1">Outer Letter 1</label>
          <input
            id="outer-letter1"
            type="text"
            value={outerLetters[1]}
            onChange={onOuterLetterChange(1)}
          />
        </div>

        <div>
          <label htmlFor="outer-letter2">Outer Letter 2</label>
          <input
            id="outer-letter2"
            type="text"
            value={outerLetters[2]}
            onChange={onOuterLetterChange(2)}
          />
        </div>

        <div>
          <label htmlFor="outer-letter3">Outer Letter 3</label>
          <input
            id="outer-letter3"
            type="text"
            value={outerLetters[3]}
            onChange={onOuterLetterChange(3)}
          />
        </div>

        <div>
          <label htmlFor="outer-letter-4">Outer Letter 4</label>
          <input
            id="outer-letter-4"
            type="text"
            value={outerLetters[4]}
            onChange={onOuterLetterChange(4)}
          />
        </div>

        <div>
          <label htmlFor="outer-letter-5">Outer Letter 5</label>
          <input
            id="outer-letter-5"
            type="text"
            value={outerLetters[5]}
            onChange={onOuterLetterChange(5)}
          />
        </div>

        <div>
          <label htmlFor="outer-letter-6">Outer Letter 6</label>
          <input
            id="outer-letter-6"
            type="text"
            value={outerLetters[6]}
            onChange={onOuterLetterChange(6)}
          />
        </div>

        <div>
          <label htmlFor="outer-letter-7">Outer Letter 7</label>
          <input
            id="outer-letter-7"
            type="text"
            value={outerLetters[7]}
            onChange={onOuterLetterChange(7)}
          />
        </div>

        <div>
          <label htmlFor="outer-letter-8">Outer Letter 8</label>
          <input
            id="outer-letter-8"
            type="text"
            value={outerLetters[8]}
            onChange={onOuterLetterChange(8)}
          />
        </div>
      </fieldset>

      <div>
        <input type="submit" value="Preview" />
      </div>
    </form>
  );
}

interface WordWheelSummaryProps {
  definition: WordWheelDefinition;
}

function WordWheelSummary({ definition }: WordWheelSummaryProps) {
  const solutions = solve(definition, WORDS);

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
