const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 720
    });
  
    win.loadFile('./webapp/index.html');
}

app.whenReady().then(() => {
    createWindow();
});
