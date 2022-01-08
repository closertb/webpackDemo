/* eslint-disable @typescript-eslint/no-var-requires */
const cp = require('child_process');
const path = require('path');

const start = (env = {}) => {
  const child = cp.fork(path.join(__dirname, 'start.js'), undefined, { env });
  child.on('message', (data = {}) => {
    const { code, payload } = data;
    if (code === 'restart') {
      child.kill('SIGINT');
      start({ REBUILD: 'rebuild', LAST_URL: payload });
    }
  });

  child.on('exit', code => code && process.exit(code));
};

start();

