import { z } from 'zod';

export const LetterSchema = z.union([
  z.literal('A'),
  z.literal('B'),
  z.literal('C'),
  z.literal('D'),
  z.literal('E'),
  z.literal('F'),
  z.literal('G'),
  z.literal('H'),
  z.literal('I'),
  z.literal('J'),
  z.literal('K'),
  z.literal('L'),
  z.literal('M'),
  z.literal('N'),
  z.literal('O'),
  z.literal('P'),
  z.literal('Q'),
  z.literal('R'),
  z.literal('S'),
  z.literal('T'),
  z.literal('U'),
  z.literal('V'),
  z.literal('W'),
  z.literal('X'),
  z.literal('Y'),
  z.literal('Z'),
]);

export const WordWheelDefinitionSchema = z.object({
  centerLetter: LetterSchema,
  outerLetters: z.tuple([
    LetterSchema,
    LetterSchema,
    LetterSchema,
    LetterSchema,
    LetterSchema,
    LetterSchema,
    LetterSchema,
    LetterSchema,
  ]),
});

export const WordWheelCreateRequestSchema = z.object({
  puzzleNumber: z.number(),
  definition: WordWheelDefinitionSchema,
});
