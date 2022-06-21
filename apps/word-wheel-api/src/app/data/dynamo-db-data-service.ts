import { DataService } from './data-service';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { WordWheelCreateRequest } from '@puzzles/word-wheel-types';

export class DynamoDbDataService extends DataService {
  #docClient: DynamoDBDocumentClient;

  constructor() {
    super();
    this.#docClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({ region: 'eu-west-1' })
    );
  }

  saveWordWheel(createRequest: WordWheelCreateRequest): void {
    this.#docClient.send(
      new PutCommand({
        TableName: 'tp-puzzles-hackday-table',
        Item: {
          TypeId: 'word-wheel',
          InstanceId: createRequest.puzzleNumber.toString(),
          definition: createRequest.definition,
        },
      })
    );
  }
}
