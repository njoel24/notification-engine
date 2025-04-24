import express from 'express';
import { WebSocketServer, type WebSocket } from 'ws';
import { Kafka } from 'kafkajs';

const host = '0.0.0.0'; // Ensure it's not 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = express();

// WebSocket server
const wss = new WebSocketServer({ port: 8081 }); 
console.log('WebSocket server running on ws://localhost:8081');

// Kafka configuration
const kafka = new Kafka({
  clientId: 'wsservice',
  brokers: ['localhost:9092'], // Replace with your Kafka broker(s)
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

const startConsumer = async () => {
  await consumer.connect();
  console.log('Kafka Consumer connected');

  await consumer.subscribe({ topic: 'notifications', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const notification = message.value?.toString();
      console.log(`Received message: ${notification}`);

      wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === 1) {
          client.send(notification as string);
        }
      });
    },
  });
};

startConsumer().catch(console.error);

// HTTP endpoint for health check
app.get('/heart-ws', (req, res) => {
  res.send({ message: 'sending heart beat from ws microservice' });
});


app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
