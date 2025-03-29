import express from 'express';

const host = '0.0.0.0'; // Ensure it's not 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/rest', (req, res) => {
  res.send({ message: 'Hello REST API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
