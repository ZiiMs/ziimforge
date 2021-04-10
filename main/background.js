import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import axios from 'axios';
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
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

const fetchMods = () => {

  // console.log(res);
  // setMods(res);
};

ipcMain.on('ping-pong', async (event, arg) => {
  const res = await axios.get('https://addons-ecs.forgesvc.net/api/v2/addon/search?gameId=1').then(async (response) => {
    // console.log(response.data);
    return response.data;
  }).catch(error => {
    console.error('Error fetching data: ', error);
  })
  console.log(res);
  event.sender.send('ping-pong', res);
});

ipcMain.on('ping-pong-sync', (event, arg) => {
  event.returnValue = `[ipcMain] "${arg}" received synchronously.`;
});
