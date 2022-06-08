export type Letter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

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

export type WordWheelGuessElement = 'CENTER' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type WordWheelGuess = WordWheelGuessElement[];

export type WordWheelUpdateError =
  | 'DOES_NOT_USE_MIDDLE_LETTER'
  | 'USES_DUPLICATE_LETTER'
  | 'ALREADY_BEEN_PLAYED'
  | 'NOT_IN_DICTIONARY';

export interface WordWheelUpdateInvalid {
  valid: false;
  error: WordWheelUpdateError;
}

export interface WordWheelUpdateValid {
  valid: true;
  wordWheel: WordWheel;
}

type WordWheelUpdate = WordWheelUpdateInvalid | WordWheelUpdateValid;

export class WordWheelLogic {
  validWords: string[];

  constructor(validWords: string[]) {
    this.validWords = validWords;
  }

  update(wordWheel: WordWheel, guess: WordWheelGuess): WordWheelUpdate {
    const validation = this.#validate(wordWheel, guess);
    if (validation === null) {
      return this.#validUpdate(wordWheel, guess);
    }
    return this.#invalidUpdate(validation);
  }

  #validUpdate(
    wordWheel: WordWheel,
    guess: WordWheelGuess
  ): WordWheelUpdateValid {
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

  #invalidUpdate(error: WordWheelUpdateError): WordWheelUpdateInvalid {
    return { valid: false, error };
  }

  #validate(
    wordWheel: WordWheel,
    guess: WordWheelGuess
  ): WordWheelUpdateError | null {
    if (this.#doesNotIncludeCenterLetter(guess)) {
      return 'DOES_NOT_USE_MIDDLE_LETTER';
    }

    if (this.#usesDuplicateLetters(guess)) {
      return 'USES_DUPLICATE_LETTER';
    }

    const word = guessToWord(guess, wordWheel.definition);

    if (this.#hasAlreadyBeenPlayed(word, wordWheel)) {
      return 'ALREADY_BEEN_PLAYED';
    }

    if (this.#isNotInListOfValidWords(word)) {
      return 'NOT_IN_DICTIONARY';
    }

    return null;
  }

  #doesNotIncludeCenterLetter(guess: WordWheelGuess): boolean {
    return !guess.includes('CENTER');
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
    if (el === 'CENTER') {
      return definition.centerLetter;
    }
    return definition.outerLetters[el];
  });

  return letters.join('');
}
