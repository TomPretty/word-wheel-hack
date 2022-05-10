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

export interface WordWheelDefinition {
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

interface WordWheel {
  definition: WordWheelDefinition;
  state: WordWheelState;
}

interface WordWheelUpdate {
  valid: boolean;
  wordWheel: WordWheel;
}

export class WordWheelLogic {
  validWords: string[];

  constructor(validWords: string[]) {
    this.validWords = validWords;
  }

  update(wordWheel: WordWheel, word: string): WordWheelUpdate {
    if (this.#isValid(wordWheel, word)) {
      return this.#validUpdate(wordWheel, word);
    }
    return this.#invalidUpdate(wordWheel);
  }

  #validUpdate(wordWheel: WordWheel, word: string): WordWheelUpdate {
    return {
      valid: true,
      wordWheel: this.#addValidWord(wordWheel, word),
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

  #isValid(wordWheel: WordWheel, word: string): boolean {
    return (
      this.#includesCenterLetter(wordWheel, word) &&
      this.#onlyUsesAvailableLetters(wordWheel, word) &&
      this.#isInListOfValidWords(word)
    );
  }

  #includesCenterLetter(wordWheel: WordWheel, word: string): boolean {
    return word.includes(wordWheel.definition.centerLetter);
  }

  #isInListOfValidWords(word: string): boolean {
    return this.validWords.includes(word);
  }

  #onlyUsesAvailableLetters(wordWheel: WordWheel, word: string): boolean {
    const availableLetters = this.#toLetterCounts(
      wordWheel.definition.centerLetter +
        wordWheel.definition.outerLetters.join("")
    );
    const usedLetters = this.#toLetterCounts(word);

    for (const [letter, count] of Object.entries(usedLetters)) {
      if (!(letter in availableLetters) || availableLetters[letter] < count) {
        return false;
      }
    }
    return true;
  }

  #toLetterCounts(word: string): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const c of word) {
      if (!(c in counts)) {
        counts[c] = 0;
      }
      counts[c] += 1;
    }
    return counts;
  }
}
