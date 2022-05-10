export type Letter =
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

export type OuterLetters = [
  Letter,
  Letter,
  Letter,
  Letter,
  Letter,
  Letter,
  Letter,
  Letter
];

export interface WordWheelDefinition {
  centerLetter: Letter;
  outerLetters: OuterLetters;
}

export interface WordWheelState {
  words: String[];
}

export interface WordWheel {
  definition: WordWheelDefinition;
  state: WordWheelState;
}

export type WordWheelGuessElement = "CENTER" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type WordWheelGuess = WordWheelGuessElement[];

interface WordWheelUpdate {
  valid: boolean;
  wordWheel: WordWheel;
}

export class WordWheelLogic {
  validWords: string[];

  constructor(validWords: string[]) {
    this.validWords = validWords;
  }

  update(wordWheel: WordWheel, guess: WordWheelGuess): WordWheelUpdate {
    if (this.#isValid(wordWheel, guess)) {
      return this.#validUpdate(wordWheel, guess);
    }
    return this.#invalidUpdate(wordWheel);
  }

  #validUpdate(wordWheel: WordWheel, guess: WordWheelGuess): WordWheelUpdate {
    return {
      valid: true,
      wordWheel: this.#addValidWord(
        wordWheel,
        guessToWord(guess, wordWheel.definition)
      ),
    };
  }

  #addValidWord(wordWheel: WordWheel, word: string): WordWheel {
    return {
      ...wordWheel,
      state: {
        ...wordWheel.state,
        words: [...wordWheel.state.words, word],
      },
    };
  }

  #invalidUpdate(wordWheel: WordWheel) {
    return { valid: false, wordWheel };
  }

  #isValid(wordWheel: WordWheel, guess: WordWheelGuess): boolean {
    if (this.#doesNotIncludeCenterLetter(guess)) {
      return false;
    }

    if (this.#usesDuplicateLetters(guess)) {
      return false;
    }

    const word = guessToWord(guess, wordWheel.definition);

    if (this.#hasAlreadyBeenPlayed(word, wordWheel)) {
      return false;
    }

    if (this.#isNotInListOfValidWords(word)) {
      return false;
    }

    return true;
  }

  #doesNotIncludeCenterLetter(guess: WordWheelGuess): boolean {
    return !guess.includes("CENTER");
  }

  #usesDuplicateLetters(guess: WordWheelGuess): boolean {
    return new Set(guess).size !== guess.length;
  }

  #isNotInListOfValidWords(word: string): boolean {
    return !this.validWords.includes(word);
  }

  #hasAlreadyBeenPlayed(word: string, wordWheel: WordWheel): boolean {
    return wordWheel.state.words.includes(word);
  }
}

// ---- Helper functions ---- //

export function guessToWord(
  guess: WordWheelGuess,
  definition: WordWheelDefinition
) {
  const letters = guess.map((el) => {
    if (el === "CENTER") {
      return definition.centerLetter;
    }
    return definition.outerLetters[el];
  });

  return letters.join("");
}
