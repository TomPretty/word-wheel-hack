import { wordWheelFactory } from "./factories";
import { Letter, OuterLetters, WordWheelLogic } from "./logic";

describe("WordWheelLogic.update", () => {
  it("accepts a valid word", () => {
    const wordWheel = wordWheelFactory.build({
      definition: {
        centerLetter: "C",
        outerLetters: padOuterLetters(["A", "G", "E"]),
      },
    });
    const word = "CAGE";
    const logic = new WordWheelLogic([word]);

    const result = logic.update(wordWheel, word);

    expect(result.valid).toBeTruthy();
    expect(result.wordWheel.state.words[0]).toBe(word);
  });

  it("rejects an invalid word", () => {
    const wordWheel = wordWheelFactory.build({
      definition: {
        centerLetter: "C",
        outerLetters: padOuterLetters(["A", "G", "E"]),
      },
    });
    const word = "CAGE";
    const logic = new WordWheelLogic(["RAGE"]);

    const result = logic.update(wordWheel, word);

    expect(result.valid).toBeFalsy();
  });

  it("rejects a valid word if it doesn't use the middle letter", () => {
    const wordWheel = wordWheelFactory.build({
      definition: {
        centerLetter: "C",
        outerLetters: padOuterLetters(["A", "G", "E"]),
      },
    });
    const word = "AGE";
    const logic = new WordWheelLogic([word]);

    const result = logic.update(wordWheel, word);

    expect(result.valid).toBeFalsy();
  });

  it("rejects a valid word if it uses letters that aren't available", () => {
    const wordWheel = wordWheelFactory.build({
      definition: {
        centerLetter: "C",
        outerLetters: padOuterLetters(["A", "G", "E"]),
      },
    });
    const word = "CARE";
    const logic = new WordWheelLogic([word]);

    const result = logic.update(wordWheel, word);

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
    const logic = new WordWheelLogic([word]);

    const result = logic.update(wordWheel, word);

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
