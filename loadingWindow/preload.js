var {ipcRenderer} = require('electron')
var ping = require('ping');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

function connexionChecker(){
    ping.sys.probe('arendelleodyssey.com', function(isAlive){
        if (!isAlive){
            document.getElementById('displaytxt').innerText = "No connexion, retrying"
        } else {
            myEmitter.emit('online');
        }
    });
}

var connexionCheck = setInterval(connexionChecker, 1000)

myEmitter.on('online', () => {
    clearInterval(connexionCheck)
    ipcRenderer.send('online');
});