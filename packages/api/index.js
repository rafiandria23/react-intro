import dotenv from 'dotenv';

// Server
import createServer from './server.js';

dotenv.config();

const { PORT = 2000 } = process.env;

const { server } = createServer();

server.listen(PORT, () => {
  console.info(`[React Intro Server] Listening on port ${PORT}!`);
});
