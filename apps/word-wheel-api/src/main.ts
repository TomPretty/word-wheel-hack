import { WordWheelCreateRequest } from '@puzzles/word-wheel-types';
import { WordWheelCreateRequestSchema } from '@puzzles/word-wheel-types-validators';
import * as express from 'express';
import { DataService } from './app/data/data-service';
import { DynamoDbDataService } from './app/data/dynamo-db-data-service';

const app = express();
const dataService: DataService = new DynamoDbDataService();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to word-wheel-api!' });
});

app.post('/api/word-wheel', express.json(), (req, res) => {
  const parseResult = WordWheelCreateRequestSchema.safeParse(req.body);

  if (parseResult.success) {
    const createRequest: WordWheelCreateRequest = parseResult.data;

    dataService.saveWordWheel(createRequest);

    res.status(203).json({ definition: createRequest.definition });
  } else {
    console.log({ error: parseResult.error });

    res.status(400).json({ message: 'invalid input' });
  }
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
