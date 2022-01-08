"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlWebpackPlugin = require("html-webpack-plugin");
function getValueFromMultiType(val) {
    return Array.isArray(val) ? val.join('') : val;
}
function default_1({ webpackConfig, config, runtime = {}, }) {
    const { publicPath = './', title = 'My App', templateContent } = config;
    // console.log('others', others);
    const { heads = [], bodies = [] } = runtime;
    webpackConfig
        .plugin('html')
        .use(HtmlWebpackPlugin, [{
            title,
            filename: 'index.html',
            publicPath,
            template: require.resolve('../index.ejs'),
        }])
        .end();
    return webpackConfig;
}
exports.default = default_1;
