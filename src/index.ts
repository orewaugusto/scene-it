import express, {Request, Response} from 'express';
const app = express();

const PORT: string = '8080';

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('testing');
})

app.listen(PORT, () => {
  console.log(`running on ${PORT}.`);
});