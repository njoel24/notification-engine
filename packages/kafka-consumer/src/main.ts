import express from 'express';

const host = '0.0.0.0'; // Ensure it's not 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = express();

app.get('/ws', (req, res) => {
  res.send({ message: 'Hello Kafka Consumer' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
