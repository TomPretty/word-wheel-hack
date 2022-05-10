import React, { useState } from "react";
import {
  guessToWord,
  WordWheel,
  WordWheelDefinition,
  WordWheelGuess,
  WordWheelGuessElement,
  WordWheelLogic,
  WordWheelUpdateError,
} from "./logic";
import "./App.css";
import { WORDS } from "./words";

const WORD_WHEEL_DEFINITION: WordWheelDefinition = {
  centerLetter: "A",
  outerLetters: ["C", "T", "G", "T", "E", "A", "I", "S"],
};

const logic = new WordWheelLogic(WORDS);

interface AppState {
  wordWheel: WordWheel;
  guess: WordWheelGuess;
  error: WordWheelUpdateError | null;
}

function App() {
  const [state, setState] = useState<AppState>({
    wordWheel: {
      definition: WORD_WHEEL_DEFINITION,
      state: { words: [] },
    },
    guess: [],
    error: null,
  });

  function toggleGuessElement(element: WordWheelGuessElement) {
    const newState: AppState = { ...state, error: null };
    if (state.guess.includes(element)) {
      newState.guess = state.guess.filter((el) => el !== element);
    } else {
      newState.guess = [...state.guess, element];
    }
    setState(newState);
  }

  function submit() {
    const newState: AppState = { ...state, error: null };

    const update = logic.update(state.wordWheel, state.guess);

    if (update.valid) {
      newState.wordWheel = update.wordWheel;
      newState.guess = [];
    } else {
      newState.error = update.error;
    }
    setState(newState);
  }

  function reset() {
    setState({ ...state, guess: [], error: null });
  }

  function deleteLastElement() {
    setState({ ...state, guess: state.guess.slice(0, -1), error: null });
  }

  return (
    <div>
      <header>Word Wheel</header>
      <p>Words: {state.wordWheel.state.words.join(", ")}</p>
      <p>Word: {guessToWord(state.guess, state.wordWheel.definition)}</p>
      {state.error && <p>Error: {state.error}</p>}

      <div>
        <button onClick={submit}>Submit</button>
        <button onClick={reset}>Reset</button>
        <button onClick={deleteLastElement}>Delete</button>
      </div>

      <WordWheelWheel
        definition={state.wordWheel.definition}
        guess={state.guess}
        toggleGuessElement={toggleGuessElement}
      />
    </div>
  );
}

// ---- Helper components ---- //

interface WordWhelWheelProps {
  definition: WordWheelDefinition;
  guess: WordWheelGuess;
  toggleGuessElement: (element: WordWheelGuessElement) => void;
}

function WordWheelWheel({
  definition,
  guess,
  toggleGuessElement,
}: WordWhelWheelProps) {
  function isSelected(element: WordWheelGuessElement) {
    return guess.includes(element);
  }

  return (
    <svg viewBox="-50 -50 100 100" width="500">
      <g>
        <circle
          cx="0"
          cy="0"
          r="48"
          stroke="black"
          strokeWidth="2px"
          fill="none"
        />

        <g className="wheel-segment" onClick={() => toggleGuessElement(0)}>
          <path
            d={`M 0 0 L -48 0 A 48 48 0 0 1 -33.9411255 -33.9411255 Z`}
            stroke="black"
            strokeWidth="2px"
            fill="None"
            data-selected={isSelected(0)}
          />

          <text x="-32.3357836" y="-13.3939201" textAnchor="middle" dy=".4em">
            {definition.outerLetters[0]}
          </text>
        </g>

        <g className="wheel-segment" onClick={() => toggleGuessElement(1)}>
          <path
            d={`M 0 0 L -33.9411255 -33.9411255 A 48 48 0 0 1 0 -48 Z`}
            stroke="black"
            strokeWidth="2px"
            fill="None"
            data-selected={isSelected(1)}
          />

          <text x="-13.3939201" y="-32.3357836" textAnchor="middle" dy=".4em">
            {definition.outerLetters[1]}
          </text>
        </g>

        <g className="wheel-segment" onClick={() => toggleGuessElement(2)}>
          <path
            d={`M 0 0 L 0 -48 A 48 48 0 0 1 33.9411255 -33.9411255 Z`}
            stroke="black"
            strokeWidth="2px"
            fill="None"
            data-selected={isSelected(2)}
          />

          <text x="13.3939201" y="-32.3357836" textAnchor="middle" dy=".4em">
            {definition.outerLetters[2]}
          </text>
        </g>

        <g className="wheel-segment" onClick={() => toggleGuessElement(3)}>
          <path
            d={`M 0 0 L 33.9411255 -33.9411255 A 48 48 0 0 1 48 0 Z`}
            stroke="black"
            strokeWidth="2px"
            fill="None"
            data-selected={isSelected(3)}
          />

          <text x="32.3357836" y="-13.3939201" textAnchor="middle" dy=".4em">
            {definition.outerLetters[3]}
          </text>
        </g>

        <g className="wheel-segment" onClick={() => toggleGuessElement(4)}>
          <path
            d={`M 0 0 L 48 0 A 48 48 0 0 1 33.9411255 33.9411255 Z`}
            stroke="black"
            strokeWidth="2px"
            fill="None"
            data-selected={isSelected(4)}
          />

          <text x="32.3357836" y="13.3939201" textAnchor="middle" dy=".4em">
            {definition.outerLetters[4]}
          </text>
        </g>

        <g className="wheel-segment" onClick={() => toggleGuessElement(5)}>
          <path
            d={`M 0 0 L 33.9411255 33.9411255 A 48 48 0 0 1 0 48 Z`}
            stroke="black"
            strokeWidth="2px"
            fill="None"
            data-selected={isSelected(5)}
          />

          <text x="13.3939201" y="32.3357836" textAnchor="middle" dy=".4em">
            {definition.outerLetters[5]}
          </text>
        </g>

        <g className="wheel-segment" onClick={() => toggleGuessElement(6)}>
          <path
            d={`M 0 0 L 0 48 A 48 48 0 0 1 -33.9411255 33.9411255 Z`}
            stroke="black"
            strokeWidth="2px"
            fill="None"
            data-selected={isSelected(6)}
          />

          <text x="-13.3939201" y="32.3357836" textAnchor="middle" dy=".4em">
            {definition.outerLetters[6]}
          </text>
        </g>

        <g className="wheel-segment" onClick={() => toggleGuessElement(7)}>
          <path
            d={`M 0 0 L -33.9411255 33.9411255 A 48 48 0 0 1 -48 0 Z`}
            stroke="black"
            strokeWidth="2px"
            fill="None"
            data-selected={isSelected(7)}
          />

          <text x="-32.3357836" y="13.3939201" textAnchor="middle" dy=".4em">
            {definition.outerLetters[7]}
          </text>
        </g>
      </g>

      <g className="wheel-segment" onClick={() => toggleGuessElement("CENTER")}>
        <circle
          cx="0"
          cy="0"
          r="20"
          stroke="black"
          strokeWidth="2px"
          fill="white"
          data-selected={isSelected("CENTER")}
        />

        <text x="0" y="0" textAnchor="middle" dy=".3em">
          {definition.centerLetter}
        </text>
      </g>
    </svg>
  );
}

export default App;
