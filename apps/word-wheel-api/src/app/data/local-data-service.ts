import { WordWheelCreateRequest } from '@puzzles/word-wheel-types';
import { DataService } from './data-service';

export class LocalDataService extends DataService {
  #wordWheels: WordWheelCreateRequest[];

  constructor() {
    super();
    this.#wordWheels = [];
  }

  saveWordWheel(createRequest: WordWheelCreateRequest): void {
    this.#wordWheels.push(createRequest);

    console.dir(this.#wordWheels, { depth: Infinity });
  }
}
