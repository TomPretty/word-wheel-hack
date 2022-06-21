import { WordWheelDefinition } from '@puzzles/word-wheel-types';
import { WORDS } from '@puzzles/word-wheel-words';

// ---- Solve ---- //

export function trieSolve(definition: WordWheelDefinition): string[] {
  const available: string[] = [
    definition.centerLetter,
    ...definition.outerLetters,
  ];

  const words = new Set<string>();
  const frontier = [{ available, trie: TRIE }];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const current = frontier.pop();

    if (!current) {
      break;
    }

    if (
      current.trie.isWord &&
      current.trie.value.includes(definition.centerLetter)
    ) {
      words.add(current.trie.value);
    }

    Object.entries(current.trie.children).forEach(([letter, trie]) => {
      const letterId = current.available.indexOf(letter);
      if (letterId > -1) {
        const newAvailable = [
          ...available.slice(0, letterId),
          ...available.slice(letterId),
        ];

        frontier.push({ available: newAvailable, trie });
      }
    });
  }

  return [...words];
}

// ---- Trie Helpers ---- //

interface Trie {
  value: string;
  isWord: boolean;
  children: Record<string, Trie>;
}

const TRIE = newTrie();

WORDS.forEach((w) => addWord(TRIE, w));

function newTrie(value = ''): Trie {
  return { value, isWord: false, children: {} };
}

function addWord(trie: Trie, word: string) {
  let currentTrie = trie;
  for (const letter of word) {
    if (!(letter in currentTrie.children)) {
      currentTrie.children[letter] = newTrie(currentTrie.value + letter);
    }
    currentTrie = currentTrie.children[letter];
  }
  currentTrie.isWord = true;
}
