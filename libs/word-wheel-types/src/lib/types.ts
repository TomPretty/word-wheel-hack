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

export interface WordWheelCreateRequest {
  puzzleNumber: number;
  definition: WordWheelDefinition;
  // ...other meta data...
}
