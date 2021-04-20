const Store = require('electron-store');

const store = new Store({
  name: 'preferences',
  defaults: {
    theme: 'default',
    wowFolder: '',
  },
});

module.exports = store;
