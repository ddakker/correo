'use strict';
const electron = require('electron');
const {BrowserWindow} = require('electron')
var menubar = require('menubar');
// var BrowserWindow = require('BrowserWindow');



// var mb = menubar({index:"https://mail.google.com/mail/mu/", tooltip: "Correo", icon:__dirname + "/res/icon.png", width:360, height:640});
var mb = menubar({index:"http://192.168.56.1:8180/monitoring/console/", tooltip: "Correo", icon:__dirname + "/res/icon.png", width:360, height:640});



const contextMenu = electron.Menu.buildFromTemplate([
  {
    label: 'About',
    click() {
      electron.dialog.showMessageBox({title: "Correo", type:"info", message: "A menubar/taskbar Gmail App \nMIT Copyright (c) 2016 Amit Merchant <bullredeyes@gmail.com>", buttons: ["Close"] });
    }
  },
  {
    label: 'Website',
    click() {
      // electron.shell.openExternal("https://github.com/amitmerchant1990/correo");

      var xCount = 3;
      var yCount = 4;
      const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
      console.log("width: ", width)
      console.log("height: ", height)

      var widthSize = Math.round(width/xCount);
      var heightSize = Math.round(height/yCount);

      console.log("widthSize: ", widthSize)
      console.log("heightSize: ", heightSize)


      var domain = 'http://192.168.56.1:8180'
      var urlArr = ['/monitoring/console/', '/monitoring/console/', '/monitoring/console/', '/monitoring/console/', '/monitoring/console/', '/monitoring/console/']
      var xValue = 0;
      var yValue = 0;

      for (var i=0; i<urlArr.length; i++) {
        console.log("i: ", i)
        var url = urlArr[i]

        if (i % xCount == 0) {
          xValue = 0;
          console.log(" %%")

          if (i != 0) {
            yValue = yValue + heightSize;
          }
        } else {
          xValue = xValue + widthSize;
        }
        console.log("xValue: ", xValue)

        var win = new BrowserWindow({
          width: widthSize,
          height: heightSize,
          x: xValue,
          y: yValue,
          autoHideMenuBar: true,
          frame: true,
          show: false,
          webPreferences: {
            nodeIntegration: false
          }
        })
        win.loadURL(domain + url)
        win.setMenu(null)
        win.show()
      }

      /*var prefsWindow1 = new BrowserWindow({
        width: 400,
        height: 400,
        x: 0,
        y: 0,
        autoHideMenuBar: true,
        show: false
      })
      prefsWindow1.loadURL('http://192.168.23.190/')
      prefsWindow1.setMenu(null)
      prefsWindow1.show()

      var prefsWindow2 = new BrowserWindow({
        width: 400,
        height: 400,
        x: 400,
        y: 0,
        show: false
      })
      prefsWindow2.loadURL('http://192.168.23.190/')
      prefsWindow2.setMenu(null)
      prefsWindow2.show()*/

    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Quit',
    click() {
      mb.app.quit();
    }
  }

]);

mb.on('ready', function ready () {
  console.log('Correo is ready to serve in the menubar.');



  if (process.platform == 'win32') {
    mb.tray.setContextMenu(contextMenu);

    var win = new BrowserWindow({
      width: 300,
      height: 400,
      x: 0,
      y: 600,
      autoHideMenuBar: true,
      frame: true,
      show: false,
      webPreferences: {
        nodeIntegration: false
      }
    })
    win.loadURL('http://192.168.56.1:8180/monitoring/api/auth/test/login')
    // win.loadURL('http://192.168.56.1:8180/monitoring/console/login.jsp')
    // win.loadURL('https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin')
    win.setMenu(null)
    win.show()
    win.webContents.openDevTools()
  }
});
