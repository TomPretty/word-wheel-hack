import { wordWheelFactory } from "./factories";
import { Letter, OuterLetters, WordWheelGuess, WordWheelLogic } from "./logic";

describe("WordWheelLogic.update", () => {
  it("accepts a valid word", () => {
    const wordWheel = wordWheelFactory.build({
      definition: {
        centerLetter: "C",
        outerLetters: padOuterLetters(["A", "G", "E"]),
      },
    });
    const guess: WordWheelGuess = ["CENTER", 0, 1, 2]; // C-A-G-E
    const logic = new WordWheelLogic(["CAGE"]);

    const result = logic.update(wordWheel, guess);

    expect(result.valid).toBeTruthy();
    expect(result.wordWheel.state.words[0]).toBe("CAGE");
  });

  it("rejects an invalid word", () => {
    const wordWheel = wordWheelFactory.build({
      definition: {
        centerLetter: "C",
        outerLetters: padOuterLetters(["A", "G", "D"]),
      },
    });
    const guess: WordWheelGuess = ["CENTER", 0, 1, 2]; // C-A-G-D
    const logic = new WordWheelLogic(["CAGE"]);

    const result = logic.update(wordWheel, guess);

    expect(result.valid).toBeFalsy();
  });

  it("rejects a valid word if it doesn't use the center letter", () => {
    const wordWheel = wordWheelFactory.build({
      definition: {
        centerLetter: "C",
        outerLetters: padOuterLetters(["A", "G", "E"]),
      },
    });
    const guess: WordWheelGuess = [0, 1, 2]; // A-G-E
    const logic = new WordWheelLogic(["AGE"]);

    const result = logic.update(wordWheel, guess);

    expect(result.valid).toBeFalsy();
  });

  it("rejects a valid word if it uses duplicate letters", () => {
    const wordWheel = wordWheelFactory.build({
      definition: {
        centerLetter: "H",
        outerLetters: padOuterLetters(["E", "L", "O"]),
      },
    });
    const guess: WordWheelGuess = ["CENTER", 0, 1, 1, 2]; // H-E-L-L-O
    const logic = new WordWheelLogic(["HELLO"]);

    const result = logic.update(wordWheel, guess);

    expect(result.valid).toBeFalsy();
  });

  it("rejects a valid word if it has already been played", () => {
    const word = "CAGE";
    const wordWheel = wordWheelFactory.build({
      definition: {
        centerLetter: "C",
        outerLetters: padOuterLetters(["A", "G", "E"]),
      },
      state: { words: [word] },
    });
    const guess: WordWheelGuess = ["CENTER", 0, 1, 2]; // C-A-G-E
    const logic = new WordWheelLogic([word]);

    const result = logic.update(wordWheel, guess);

    expect(result.valid).toBeFalsy();
  });
});

// ---- Helpers ---- //

function padOuterLetters(letters: Letter[]): OuterLetters {
  const padded: OuterLetters = ["X", "X", "X", "X", "X", "X", "X", "X"];

  letters.forEach((l, index) => {
    padded[index] = l;
  });

  return padded;
}
