const express = require('express');
const app = express();

const PORT:string = '8080';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('testing');
})

app.listen(PORT, () => {
  console.log(`running on ${PORT}.`);
});