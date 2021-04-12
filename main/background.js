import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import axios from 'axios';
import { createWindow } from './helpers';
// import console from 'node:console';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    height: 600,
    width: 1000,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('fetchMods', async event => {
  const res = await axios
    .get('https://addons-ecs.forgesvc.net/api/v2/addon/search?gameId=1')
    .then(async response => {
      // console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  event.sender.send('fetchMods', res);
});
