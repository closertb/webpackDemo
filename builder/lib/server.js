"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function default_1({ webpackConfig, config, isDev, }) {
    if (!isDev) {
        return webpackConfig;
    }
    // devserver 设定
    webpackConfig
        .devServer
        .host('localhost')
        .port(8005)
        .hot(true)
        .https(false)
        .compress(false)
        .historyApiFallback(true)
        // .writeToDisk(true)
        // .static(false)
        .headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    })
        .client.set('progress', true)
        .end();
    // 合并通用设置中的 devserver；
    if (config.devServer) {
        webpackConfig.merge({
            devServer: config.devServer,
        });
    }
    return webpackConfig;
}
exports.default = default_1;
