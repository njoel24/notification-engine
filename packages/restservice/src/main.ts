import express from 'express';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'http-producer',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();

const startProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer connected');
};

startProducer().catch(console.error);

const host = '0.0.0.0'; 
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

// HTTP endpoint to send notifications
app.post('/notifications', async (req, res) => {
  const { message } = req.body || {};

  if (!message) {
    return res.status(400).send({ error: 'Message is required' });
  }

  try {
    await producer.send({
      topic: 'notifications',
      messages: [{ value: message }],
    });
    return res.status(200).send({ status: 'Message sent to Kafka' });
  } catch (error) {
    console.error('Error sending message to Kafka:', error);
    return res.status(500).send({ error: 'Failed to send message' });
  }
});

app.get('/heart-rest', (req, res) => {
  res.send({ message: 'Sending heart beat from rest service' });
});

app.get('/', (req, res) => {
  res.send({ message: 'Sending default response' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
