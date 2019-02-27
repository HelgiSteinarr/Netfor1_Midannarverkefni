/*jshint esversion: 6 */
var io = require('socket.io-client');

export default class ClientNetwork {

    constructor()
    {
        this.hostConnection = null;
        this.connected = false;
        this.onUpdate = (data) => {};
        this.onConnected = () => {};
    }

    event(data)
    {
        console.log("Recieved data");
        console.log(data);
        this.onUpdate(data);
    }
    
    connect(ip)
    {
        console.log("Trying to connect to " + ip);
        let self = this;
        this.hostConnection = new io(ip);
        this.hostConnection.on('connect', () => {
            self.connected = true;
            self.onConnected();
            console.log("connected");
        });
        this.hostConnection.on('disconnect', () => {
            self.connected = false;
            console.log("Disconnected");
        });
        this.hostConnection.on('event', this.event);
    }

    sendToHost(data)
    {
        console.log("sendToHost")
        if (!this.connected) {
            console.log("Error: not connected (L43, clientNetwork.js)");
            return;
        }
        this.hostConnection.emit(JSON.stringify(data));
    }
}
