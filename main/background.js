import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import axios from 'axios';
import { createWindow } from './helpers';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

let mainWindow;

(async () => {
  await app.whenReady();

  mainWindow = createWindow('main', {
    height: 600,
    minHeight: 300,
    minWidth: 750,
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

ipcMain.handle('fetchMods', async (event, args) => {
  console.time('fetchMods');
  console.log(args);
  const res = await axios
    .get('https://addons-ecs.forgesvc.net/api/v2/addon/search', {
      params: { gameId: 1, sort: args },
    })
    .then(async response => {
      // console.log(response.data);
      const newArray = [];
      response.data.forEach(element => {
        const {
          id,
          name,
          authors,
          attachments,
          latestFiles,
          categorySection,
          categories,
          status,
          dateModified,
          downloadCount,
        } = element;
        const data = {
          id,
          name,
          authors,
          attachments,
          latestFiles,
          categorySection,
          dateModified,
          categories,
          status,
          downloadCount,
        };
        newArray.push(data);
      });
      return newArray;
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  console.timeEnd('fetchMods');
  // mainWindow.webContents.request('getMods', res);
  return res;
  // event.sender.send('fetchMods', res);
});
