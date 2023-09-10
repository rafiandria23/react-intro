import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import * as uuid from 'uuid';

function createServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  app.use(cors());
  app.use(express.json());

  app.use('*', (_, res) => {
    return res.json({
      success: true,
      timestamp: new Date(),
      message: 'Connected to React Intro API!',
    });
  });

  io.on('connection', (socket) => {
    console.info(`[Socket] ${socket.id} connected!`);

    socket.on('message', (message) => {
      const newMessage = {
        ...message,
        id: uuid.v4(),
      };

      io.emit('message', newMessage);
    });
  });

  return {
    server,
    io,
  };
}

export default createServer;
