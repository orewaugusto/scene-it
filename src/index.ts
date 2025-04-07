import express, {Request, Response} from 'express';
const app = express();

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const PORT: string = '8080';

app.use(express.json());

app.get('/', async(req: Request, res: Response) => {
  await prisma.user.create({
    data: {
      email: "teste@gmail.com",
      password: crypto.randomUUID(),
      username: "guilherme",
    }
  })
  res.send('testing');

})

app.listen(PORT, () => {
  console.log(`running on ${PORT}.`);
});

