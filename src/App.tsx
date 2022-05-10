import React from "react";

type Letter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

interface WordWheelDefinition {
  centerLetter: Letter;
  outerLetters: [
    Letter,
    Letter,
    Letter,
    Letter,
    Letter,
    Letter,
    Letter,
    Letter
  ];
}

interface WordWheelState {
  words: String[];
}

export interface WordWheel {
  definition: WordWheelDefinition;
  state: WordWheelState;
}

const WORD_WHEEL_DEFINITION: WordWheelDefinition = {
  centerLetter: "A",
  outerLetters: ["C", "T", "G", "T", "E", "A", "I", "S"],
};

function App() {
  return (
    <div>
      <header>Word Wheel</header>
    </div>
  );
}

export default App;
