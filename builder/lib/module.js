"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { resolve } = require;
// js 文件处理
function default_1({ webpackConfig, config, isDev, staticDir = 'static', }) {
    // 构建结果，文件是否带hash数字;
    // const isHash = !isDev && config.hash;
    webpackConfig.module
        .rule('ts')
        .test(/\.(ts|tsx)$/)
        .exclude.add(/node_modules/).end()
        .use('ts-loader')
        .loader(resolve('ts-loader'))
        .options({
        transpileOnly: true,
    });
    webpackConfig.module
        .rule('js')
        .test(/\.jsx?$/)
        .exclude
        .add(/node_modules/)
        .end()
        .use('babel-loader')
        .loader(resolve('babel-loader'))
        .options({
        compact: false,
        presets: [
            resolve('@babel/preset-react'),
            [
                resolve('@babel/preset-env'),
                {
                    targets: {
                        browsers: [
                            'last 2 versions',
                            'Firefox ESR',
                            '> 1%',
                            'ie >= 8',
                            'iOS >= 8',
                            'Android >= 4',
                        ],
                    },
                },
            ],
        ],
        plugins: [
            // 应用第三方模块统计插件
            // resolve('babel-plugin-cook'),
            resolve('@babel/plugin-proposal-object-rest-spread'),
            [
                resolve('@babel/plugin-proposal-decorators'),
                {
                    legacy: true,
                },
            ],
            resolve('@babel/plugin-transform-runtime'),
            resolve('@babel/plugin-proposal-class-properties'),
            resolve('@babel/plugin-proposal-function-bind'),
            resolve('@babel/plugin-proposal-export-default-from'),
            resolve('@babel/plugin-proposal-export-namespace-from'),
            resolve('babel-plugin-syntax-dynamic-import'),
        ],
    });
    // prettier-ignore
    webpackConfig
        .module
        .rule('asset')
        .test(/\.(png|jpe?g|gif|webp|ico|eot|woff|woff2|ttf)(\?.*)?$/)
        .type('asset/resource')
        .generator({
        filename: `${staticDir}/[hash][ext]`,
    });
    // inline
    webpackConfig.module
        .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .type('asset/inline')
        .generator({
        filename: `${staticDir}/[hash][ext]`,
    });
}
exports.default = default_1;
