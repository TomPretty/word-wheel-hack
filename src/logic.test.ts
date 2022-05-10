import { WordWheel } from "./App";
import { WordWheelDefinition, WordWheelLogic } from "./logic";

describe("WordWheelLogic.update", () => {
  const WORD_WHEEL_DEFINITION: WordWheelDefinition = {
    centerLetter: "A",
    outerLetters: ["C", "T", "G", "T", "E", "A", "I", "S"],
  };

  it("accepts a valid word", () => {
    const wordWheel: WordWheel = {
      definition: WORD_WHEEL_DEFINITION,
      state: { words: [] },
    };
    const word = "CAGE";
    const logic = new WordWheelLogic([word]);

    const result = logic.update(wordWheel, word);

    expect(result.valid).toBeTruthy();
    expect(result.wordWheel.state.words[0]).toBe(word);
  });

  it("rejects an invalid word", () => {
    const wordWheel: WordWheel = {
      definition: WORD_WHEEL_DEFINITION,
      state: { words: [] },
    };
    const word = "CAGE";
    const logic = new WordWheelLogic(["RAGE"]);

    const result = logic.update(wordWheel, word);

    expect(result.valid).toBeFalsy();
  });

  it("rejects a valid word if it doesn't use the middle letter", () => {
    const wordWheel: WordWheel = {
      definition: WORD_WHEEL_DEFINITION,
      state: { words: [] },
    };
    const word = "TEST";
    const logic = new WordWheelLogic(["TEST"]);

    const result = logic.update(wordWheel, word);

    expect(result.valid).toBeFalsy();
  });

  it("rejects a valid word if it uses letters that aren't available", () => {
    const wordWheel: WordWheel = {
      definition: WORD_WHEEL_DEFINITION,
      state: { words: [] },
    };
    const word = "GAGE";
    const logic = new WordWheelLogic(["GAGE"]);

    const result = logic.update(wordWheel, word);

    expect(result.valid).toBeFalsy();
  });
});
