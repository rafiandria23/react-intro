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

  let totalConnectedClients = 0;
  let totalSentMessages = 0;

  io.on('connection', (socket) => {
    console.info(`[Socket] ${socket.id} connected!`);

    totalConnectedClients++;
    console.info(`[Socket] Total connected clients: ${totalConnectedClients}.`);

    socket.on('disconnect', (reason) => {
      totalConnectedClients--;
      console.info(
        `[Socket] Total connected clients: ${totalConnectedClients}.`,
      );
      console.info(`[Socket] ${socket.id} disconnected! Reason: ${reason}.`);
    });

    socket.on('message', (message) => {
      const newMessage = {
        ...message,
        id: uuid.v4(),
      };

      io.emit('message', newMessage);

      totalSentMessages++;
      console.info(`[Socket] Total sent messages: ${totalSentMessages}.`);
    });
  });

  return {
    server,
    io,
  };
}

export default createServer;
