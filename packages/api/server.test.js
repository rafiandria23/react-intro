import supertest from 'supertest';
import SocketIOClient from 'socket.io-client';
import * as uuid from 'uuid';

// Server
import createServer from './server';

describe('React Intro Server', () => {
  describe('HTTP', () => {
    let client;

    beforeAll(() => {
      const { server } = createServer();
      client = supertest(server);
    });

    test('GET *', async () => {
      const { body } = await client.get('/');

      expect(body.success).toBeTruthy();
      expect(
        new Date(body.timestamp).toString() !== 'Invalid Date',
      ).toBeTruthy();
      expect(body.message).toBeDefined();
    });
  });

  describe('WebSocket', () => {
    const mockedMessage = {
      id: uuid.v4(),
      name: 'Mocked Name',
      message: 'Mocked Message',
    };

    let io, serverSocket, clientSocket;

    beforeAll((done) => {
      const { server, io: serverIO } = createServer();

      io = serverIO;

      server.listen(() => {
        const port = server.address().port;

        clientSocket = new SocketIOClient(`http://127.0.0.1:${port}`);

        io.on('connection', (socket) => {
          serverSocket = socket;
        });

        clientSocket.on('connect', done);
      });
    });

    afterAll(() => {
      io.close();
      clientSocket.close();
    });

    test('sends message to server...', (done) => {
      clientSocket.on('message', (message) => {
        expect(message.id).toBe(mockedMessage.id);
        expect(message.name).toBe(mockedMessage.name);
        expect(message.message).toBe(mockedMessage.message);

        done();
      });

      serverSocket.emit('message', mockedMessage);
    });

    test('send message to client...', (done) => {
      serverSocket.on('message', (message) => {
        expect(message.name).toBe(mockedMessage.name);
        expect(message.message).toBe(mockedMessage.message);

        serverSocket.emit('message', mockedMessage);

        done();
      });

      clientSocket.emit('message', {
        name: mockedMessage.name,
        message: mockedMessage.message,
      });
    });
  });
});
