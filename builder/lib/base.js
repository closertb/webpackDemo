"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const ROOT_PATH = process.cwd();
const BUILD_PATH = path.resolve(ROOT_PATH, '/dist');
const ASSETS_URL = '/';

function default_1({ webpackConfig, config }) {
    const jsEntryFile = path.join(ROOT_PATH, 'src/index');
    webpackConfig.stats({
        colors: true,
        errors: true,
        warnings: true,
    });
    // entry 设定
    webpackConfig
        .entry('index')
        .add(jsEntryFile)
        .end();
    // console.log('--------assets:', ASSETS_URL);
    // outPut 设置
    webpackConfig
        .output
        .path(BUILD_PATH)
        .filename('[name].js')
        .publicPath(ASSETS_URL)
        .chunkFilename('[name].chunk.js')
        .end();
    if (!config.resolveLoader) {
        config.resolveLoader = {};
    }
    webpackConfig.resolve
        .fallback
        .set('buffer', require.resolve('buffer'))
        .set('crypto', require.resolve('crypto-browserify'))
        .set('process', require.resolve('process/browser'))
        .set('stream', require.resolve('stream-browserify'))
        .set('zlib', require.resolve('browserify-zlib'));
    webpackConfig.merge({
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
        },
        resolveLoader: Object.assign({ roots: [path.join(__dirname, 'node_modules')] }, config.resolveLoader),
    });
    return webpackConfig;
}
exports.default = default_1;
