import express, { Request, Response } from "express";
const app = express();

import userRouter from "./modules/users/users.routes";
import moviesRouter from "./modules/movies/movies.routes";
import ratingsRouter from "./modules/ratings/ratings.routes";

const PORT: string = "8080";

app.use(express.json());

// Routers
app.use("/users", userRouter);
app.use("/movies", moviesRouter);
app.use("/ratings", ratingsRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`running on ${PORT}.`);
});
