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
        this.onUpdate(data);
    }
    
    connect(ip)
    {
        let self = this;
        this.hostConnection = io(ip);
        this.hostConnection.on('connect', () => {
            self.connected = true;
            self.onConnected();
        });
        this.hostConnection.on('disconnect', () => {
            self.connected = false;
            console.log("Disconnected");
        });
        this.hostConnection.on('event', this.event);
    }

    sendToHost(data)
    {
        if (!connected) {
            console.log("Error: not connected (L43, clientNetwork.js)");
            return;
        }
        this.hostConnection.send(data);
    }
}
