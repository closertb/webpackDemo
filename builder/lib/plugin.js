"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
const webpack_1 = require("webpack");
// DefinePlugin
function default_1({ webpackConfig, config, isDev, }) {
    // 编译进度，仅本地构建时生效
    webpackConfig.when(!isDev, (_config) => {
        _config.plugin('progress').use(ProgressBarPlugin);
    });
    // 编译进度，仅本地构建时生效
    webpackConfig.when(isDev && config.analyze, (_config) => {
        _config.plugin('analyse').use(webpack_bundle_analyzer_1.BundleAnalyzerPlugin);
    });
    // 清理构建产物
    webpackConfig
        .plugin('clean')
        .use(CleanWebpackPlugin, ['dist']);
    // 处理 webpack 5 不再默认输出process 变量
    webpackConfig
        .plugin('provide')
        .use(webpack_1.ProvidePlugin, [{
            process: require.resolve('process/browser'),
        }]);

    // 产出 moment 中文处理
    webpackConfig.when(!config.ignoreMomentLocale, (_config) => {
        _config.plugin('moment').use(webpack_1.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/]);
    });
    // 产出 public 文件夹处理
    // webpackConfig.when(config.usePublic, (_config) => {
    //   _config
    //     .plugin('copy')
    //     .use(CopyWebpackPlugin, [{
    //       patterns: [{
    //         from: './public', // 打包的静态资源目录地址
    //         to: './',
    //       }],
    //     }]);
    // });
}
exports.default = default_1;
