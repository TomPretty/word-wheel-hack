import { wordWheelFactory } from "./factories";
import { WordWheelLogic } from "./logic";

describe("WordWheelLogic.update", () => {
  it("accepts a valid word", () => {
    const wordWheel = wordWheelFactory.build({
      definition: {
        centerLetter: "C",
        outerLetters: ["A", "G", "E", "X", "X", "X", "X", "X"],
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
        outerLetters: ["A", "G", "E", "X", "X", "X", "X", "X"],
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
        outerLetters: ["A", "G", "E", "X", "X", "X", "X", "X"],
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
        outerLetters: ["A", "G", "E", "X", "X", "X", "X", "X"],
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
        outerLetters: ["A", "G", "E", "X", "X", "X", "X", "X"],
      },
      state: { words: [word] },
    });
    const logic = new WordWheelLogic([word]);

    const result = logic.update(wordWheel, word);

    expect(result.valid).toBeFalsy();
  });
});
