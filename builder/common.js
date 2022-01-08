/**
 * production配置文件
*/
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { moduleConfig } = require('./lib');

const ROOT_PATH = process.cwd();

const appConfigPath = path.join(ROOT_PATH, 'app.config.js');

const genConfig = async () => {
  const appConfig = require(appConfigPath);

  const { title, runtime, webpack: _webpack = {} } = appConfig;

  let finalConfig = moduleConfig({
    config: _webpack,
    title,
    env: process.env.NODE_ENV,
    runtime,
  });

  // 先执行configApi，还是先执行config，这个逻辑你可以自己定;
  if (_webpack.configApi) {
    finalConfig = await _webpack.configApi(finalConfig).toConfig();
  } else {
    finalConfig = finalConfig.toConfig();
  }
  // console.log('finalConfig', finalConfig);

  const _final = _webpack.config ? _webpack.config(finalConfig, webpack) : finalConfig;

  return _final;
};

module.exports = {
  genConfig,
  appConfigPath,
};
