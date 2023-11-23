import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/users/user.route';

const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

export default app;
