import { createServer } from 'http';
import app from './app';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { createSocketServer } from './socket';
import { logger } from './utils/logger';

async function start() {
  // Connect to database
  await connectDatabase();

  // Create HTTP server and attach Socket.io
  const httpServer = createServer(app);
  createSocketServer(httpServer);

  // Start listening
  httpServer.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
    logger.info(`Environment: ${env.NODE_ENV}`);
  });
}

start().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});
