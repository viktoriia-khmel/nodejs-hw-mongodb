import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
// HfVKS0Uo6iatvmTc
export const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
