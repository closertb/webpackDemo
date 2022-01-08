const path = require('path');

module.exports = {
  platform: 'pc',
  title: '平台服务',
  // 页面配置
  page: [{
    module: 'index',
    path: './src/index',
    title: '平台服务',
  }],
  // runtime相关配置
  runtime: {
    // 全局head
    heads: [
    ],
    // 全局body
    bodies: [
    ],
  },
  webpack: {
    // 主题配置
    themes: {
      '@hd': '2px',
    },
    usePublic: true,
    devServer: {
      port: 8905,
      host: 'localhost',
      path: '/#/mobx',
      query: {
        a: 1,
      },
      proxy: {
        '/api': {
          target: 'https://gldpartner.keruyun.com',
          changeOrigin: true,
          secure: true,
          // logLevel: 'debug',
          bypass: (req) => {
            console.log(req.url);
            return null;
          },
        },
      },
    },
    // 是否开启chunk分析
    analyze: false,
    // extraPostCSSPlugins: [plugin],
    configApi: (config) => {
      config.externals({
        react: 'React',
        'react-dom': 'ReactDOM',
      });
      config.output.libraryTarget('system');
      config.devtool('cheap-source-map');

      return config;
    },
    // 自定义构建配置、config为全局的构建配置
    config: (webpackConfig) => {
      // console.log('alias', webpackConfig.module);
      // webpackConfig.module.rules.forEach(rule => {
      //   if (rule.test.test('index.less')) {
      //     rule.use.forEach((_rule) => {
      //       // 配置viewport转换
      //       if (_rule.loader.includes('postcss-loader')) {
      //         _rule.options.plugins.push(plugin);
      //       }
      //     });
      //   }
      // });
      return webpackConfig;
    },
  },
};
