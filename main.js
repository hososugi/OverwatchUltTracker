const { app, BrowserWindow } = require('electron')
const fs   = require('fs');
const path = require('path');
const less = require('less');

function build()
{
  buildLess();
  createWindow();
}

function buildLess()
{
  var basePath   = __dirname;
  var lessPath   = basePath + '/resources/less/app.less';
  var outputPath = basePath + '/www/css/app.css';

  fs.readFile(lessPath,function(error,data){
    data = data.toString();
    
    less.render(data).then(function(css){
      fs.writeFile(outputPath, css.css, function(err){
          console.log('INFO: done writing less to css.');
      });
    });
  });

}

function createWindow()
{
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 100,
    /*titleBarStyle: 'customButtonsOnHover',
    transparent: true,
    frame: false,*/
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.on('ready', build)