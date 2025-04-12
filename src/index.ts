import express, {Request, Response} from 'express';
const app = express();

import userRouter from './modules/users/users.routes';

const PORT: string = '8080';

app.use(express.json());

// Routers
app.use("/users", userRouter);

app.get('/', async(req: Request, res: Response) => {
  res.send('ok');
});

app.listen(PORT, () => {
  console.log(`running on ${PORT}.`);
});

