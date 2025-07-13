const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
    },
    configure: (webpackConfig) => {
      // 添加 Node.js 核心模块的 fallback 配置
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback, // 保留任何已有的 fallback 配置
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"), // 通常与 http 一起需要
        "url": require.resolve("url/"),
        "util": require.resolve("util/"),
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert/"),
        "buffer": require.resolve("buffer/"),
      };

      // 添加 webpack 插件以提供全局变量（如 'process' 和 'Buffer'）
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          process: 'process/browser', // 提供 'process' 全局变量
          Buffer: ['buffer', 'Buffer'], // 提供 'Buffer' 全局变量
        }),
      ];

      return webpackConfig;
    },
}