import { WordWheelCreateRequest } from '@puzzles/word-wheel-types';
import { WordWheelCreateRequestSchema } from '@puzzles/word-wheel-types-validators';
import { useState } from 'react';
import {
  Select,
  Option,
  TextInput,
  Button,
} from '@guardian/source-react-components';
import styles from './WordWheelForm.module.css';

interface WordWheelFormProps {
  onSubmit: (createRequest: WordWheelCreateRequest) => void;
}

export function WordWheelForm({ onSubmit }: WordWheelFormProps) {
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

    setPuzzleNumberInput(value);
  };

  const onCenterLetterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;

    setCenterLetter(value.toUpperCase());
  };

  const onOuterLetterChange =
    (letterId: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;

      setOutterLetters({ ...outerLetters, [letterId]: value.toUpperCase() });
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const puzzleNumber = parseInt(puzzleNumberInput);
    const definition = {
      centerLetter: centerLetter,
      outerLetters: [
        outerLetters[1],
        outerLetters[2],
        outerLetters[3],
        outerLetters[4],
        outerLetters[5],
        outerLetters[6],
        outerLetters[7],
        outerLetters[8],
      ],
    };
    const createRequest = { puzzleNumber, definition };

    const parseResult = WordWheelCreateRequestSchema.safeParse(createRequest);

    if (parseResult.success) {
      onSubmit(parseResult.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput
          id="puzzle-number"
          label="Puzzle number"
          type="number"
          width={10}
          value={puzzleNumberInput}
          onChange={onPuzzleNumberChange}
        />
      </div>

      <div className={styles['select-container']}>
        <Select
          id="center-letter"
          label="Center letter"
          value={centerLetter}
          onChange={onCenterLetterChange}
        >
          <LetterSelectOptions />
        </Select>
      </div>

      <div className={styles['select-container']}>
        <Select
          id="outer-letter1"
          label="Outer letter 1"
          value={outerLetters[1]}
          onChange={onOuterLetterChange(1)}
        >
          <LetterSelectOptions />
        </Select>
      </div>

      <div className={styles['select-container']}>
        <Select
          id="outer-letter2"
          label="Outer Letter 2"
          value={outerLetters[2]}
          onChange={onOuterLetterChange(2)}
        >
          <LetterSelectOptions />
        </Select>
      </div>

      <div className={styles['select-container']}>
        <Select
          id="outer-letter3"
          label="Outer Letter 3"
          value={outerLetters[3]}
          onChange={onOuterLetterChange(3)}
        >
          <LetterSelectOptions />
        </Select>
      </div>

      <div className={styles['select-container']}>
        <Select
          id="outer-letter-4"
          label="Outer Letter 4"
          value={outerLetters[4]}
          onChange={onOuterLetterChange(4)}
        >
          <LetterSelectOptions />
        </Select>
      </div>

      <div className={styles['select-container']}>
        <Select
          id="outer-letter-5"
          label="Outer Letter 4"
          value={outerLetters[5]}
          onChange={onOuterLetterChange(5)}
        >
          <LetterSelectOptions />
        </Select>
      </div>

      <div className={styles['select-container']}>
        <Select
          id="outer-letter-6"
          label="Outer Letter 4"
          value={outerLetters[6]}
          onChange={onOuterLetterChange(6)}
        >
          <LetterSelectOptions />
        </Select>
      </div>

      <div className={styles['select-container']}>
        <Select
          id="outer-letter-7"
          label="Outer Letter 7"
          value={outerLetters[7]}
          onChange={onOuterLetterChange(7)}
        >
          <LetterSelectOptions />
        </Select>
      </div>

      <div className={styles['select-container']}>
        <Select
          id="outer-letter-8"
          label="Outer Letter 8"
          value={outerLetters[8]}
          onChange={onOuterLetterChange(8)}
        >
          <LetterSelectOptions />
        </Select>
      </div>

      <div className={styles['submit-button-container']}>
        <Button type="submit">Preview</Button>
      </div>
    </form>
  );
}

// ---- Helpers ---- //

function LetterSelectOptions() {
  return (
    <>
      <Option value="" disabled selected>
        Select a letter
      </Option>
      <Option value="A">A</Option>
      <Option value="B">B</Option>
      <Option value="C">C</Option>
      <Option value="D">D</Option>
      <Option value="E">E</Option>
      <Option value="F">F</Option>
      <Option value="G">G</Option>
      <Option value="H">H</Option>
      <Option value="I">I</Option>
      <Option value="J">J</Option>
      <Option value="K">K</Option>
      <Option value="L">L</Option>
      <Option value="M">M</Option>
      <Option value="N">N</Option>
      <Option value="O">O</Option>
      <Option value="P">P</Option>
      <Option value="Q">Q</Option>
      <Option value="R">R</Option>
      <Option value="S">S</Option>
      <Option value="T">T</Option>
      <Option value="U">U</Option>
      <Option value="V">V</Option>
      <Option value="W">W</Option>
      <Option value="X">X</Option>
      <Option value="Y">Y</Option>
      <Option value="Z">Z</Option>
    </>
  );
}
