"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCSSRule = void 0;
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 代码打包成文件注入html
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // css 代码压缩
const miniCssExtractLoader = MiniCssExtractPlugin.loader;
function createCSSRule({ webpackConfig, config, lang, test, isDev, loader, options, browserslist, }) {
    const rule = webpackConfig.module.rule(lang).test(test);
    // 开发环境，采用样式标签直接插入
    if (!config.disableInline && isDev) {
        rule
            .use('style-loader')
            .loader(require.resolve('style-loader'))
            .options(config.styleLoader || {})
            .end();
    }
    else {
        rule
            .use('extract-css-loader')
            .loader(miniCssExtractLoader)
            .options({})
            .end();
    }
    // if (isDev && isCSSModules && config.cssModulesTypescriptLoader) {
    //   rule
    //     .use('css-modules-typescript-loader')
    //     .loader(
    //       require.resolve('css-modules-typescript-loader'),
    //     )
    //     .options(config.cssModulesTypescriptLoader)
    //     .end();
    // }
    rule
        .use('css-loader')
        .loader(require.resolve('css-loader'))
        .options({})
        .end()
        .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options({
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: [
            // https://github.com/luisrudge/postcss-flexbugs-fixes
            // require('postcss-flexbugs-fixes'),
            // https://github.com/csstools/postcss-preset-env
            require('postcss-preset-env')({
                // TODO: set browsers
                autoprefixer: Object.assign(Object.assign({}, config.autoprefixer), { overrideBrowserslist: browserslist }),
                // https://cssdb.org/
                stage: 3,
            }),
            ...(config.extraPostCSSPlugins ? config.extraPostCSSPlugins : []),
        ],
    })
        .end();
    if (loader) {
        // console.log('----theme:', options);
        rule
            .use(loader)
            .loader(require.resolve(loader))
            .options(options || {});
    }
}
exports.createCSSRule = createCSSRule;
function default_1({ config, webpackConfig, isDev, disableCompress, browserslist, }) {
    // css
    createCSSRule({
        webpackConfig,
        config,
        isDev,
        lang: 'css',
        test: /\.(css)(\?.*)?$/,
        browserslist,
    });
    // less
    const { themes } = config;
    // console.log('theme:', config);
    createCSSRule({
        webpackConfig,
        config,
        isDev,
        lang: 'less',
        test: /\.(less)(\?.*)?$/,
        loader: 'less-loader',
        options: {
            lessOptions: themes ? {
                modifyVars: themes,
                javascriptEnabled: true,
                strictMath: false,
            } : { strictMath: false },
        },
        browserslist,
    });
    // css 分离相关的样式插件安装
    if (!config.styleLoader) {
        const hash = !isDev && config.hash ? '.[contenthash:8]' : '';
        // only csr generator css files
        webpackConfig
            .plugin('extract-css')
            .use(MiniCssExtractPlugin, [
            {
                filename: `[name]${hash}.css`,
                chunkFilename: `[name]${hash}.chunk.css`,
                ignoreOrder: true,
            },
        ]);
    }
    if (!isDev && !disableCompress) {
        webpackConfig
            .plugin('optimize-css')
            .use(OptimizeCSSAssetsPlugin, [
            {
                cssProcessorPluginOptions: {
                    preset: ['default', config.cssnano],
                },
            },
        ]);
    }
}
exports.default = default_1;
