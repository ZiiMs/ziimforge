const Store = require('electron-store');

const store = new Store({
  name: 'preferences',
  defaults: {
    theme: 'inverse',
  },
});

module.exports = store;
