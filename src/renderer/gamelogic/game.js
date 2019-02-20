/*jshint esversion: 6 */
var ClientNetwork = require('./clientNetwork.js');
var HostNetwork = require('./hostNetwork.js');

export default class Game {

    constructor(mode)
    {
        this.mode = mode;
        switch (mode) {
            case 0: { // Client 
                this.network = new ClientNetwork();
                this.network.onUpdate = (data) => {

                };
                break;
            }
            case 1: { // Host
                this.network = new HostNetwork();
                this.network.onConnection = client => {
                    console.log("Player connected!");
                    console.log(client);
                };
                this.network.onUpdate = data => {
                    this.network.sendToAllClients(data);
                };
                break;
            }
        }
    }

    connect(ip)
    {
        if (mode != 0) return;
        this.network.connect(ip);
    }

    sendDrawUpdate()
    {
        switch (mode) {
            case 0: { // Client
                this.network.sendToHost();
            }
        }
    }
}
