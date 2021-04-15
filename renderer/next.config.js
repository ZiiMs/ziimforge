const withLess = require('@zeit/next-less');
// const path = require('path');

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack: config => {
    Object.assign(config, {
      // entry: {
      //   preload: './main/',
      // },
      target: 'electron-renderer',
    });
    return config;
  },
});
