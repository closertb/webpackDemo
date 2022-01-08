/* eslint-disable @typescript-eslint/no-var-requires */
const { startServer } = require('./lib');
const { genConfig, appConfigPath } = require('./common');

process.env.NODE_ENV = 'development';

const start = async () => {
  const config = await genConfig();

  const server = startServer(config, appConfigPath);

  server.start();
};

start();
