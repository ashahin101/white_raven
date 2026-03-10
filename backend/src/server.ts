// Load environment variables from .env file
import 'dotenv/config';
import app from './App.js';

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 8081;
app.startServer(PORT);

const signals = ['SIGINT', 'SIGTERM', 'SIGUSR2'];

// To be extra clean; close the express server properly:
signals.forEach((signal) => {
  process.on(signal, () => {
    console.log(`Received ${signal}. Shutting down server...`);
    process.exit(0);
  });
});
