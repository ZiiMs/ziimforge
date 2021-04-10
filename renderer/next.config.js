const withLess = require('@zeit/next-less');
module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  webpack: (config) => Object.assign(config, {
    target: 'electron-renderer',
  }),
});