import { WordWheelCreateRequest } from '@puzzles/word-wheel-types';

export abstract class DataService {
  abstract saveWordWheel(createRequest: WordWheelCreateRequest): void;
}
