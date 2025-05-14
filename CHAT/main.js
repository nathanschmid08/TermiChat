const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let currentDir = process.env.HOME;

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 384,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('run-command', async (event, command) => {
    if (command.startsWith('cd ')) {
        const newPath = command.slice(3).trim();
        if (newPath === '~') {
            currentDir = process.env.HOME;
        } else {
            currentDir = require('path').resolve(currentDir, newPath);
        }
        return `Wechsle zu: ${currentDir}`;
    }

    return new Promise((resolve) => {
        exec(command, { cwd: currentDir }, (err, stdout, stderr) => {
            if (err) return resolve(stderr || err.message);
            resolve(stdout || stderr);
        });
    });
});