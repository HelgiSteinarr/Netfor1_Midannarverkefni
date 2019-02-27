/*jshint esversion: 6 */
import ClientNetwork from './clientNetwork';
import HostNetwork from './hostNetwork';
//var ClientNetwork = require('./clientNetwork.js');
//var HostNetwork = require('./hostNetwork.js');

export default class Game {

    constructor(mode = -1)
    {
        this.mode = mode;
        this.updateCanvas = null;
        this.network = null;
    }

    start(mode, ip=null)
    {
        this.mode = mode;
        switch (this.mode) {
            case 0: { // Client
                if (ip == null) return;
                this.network = new ClientNetwork();
                this.connect(ip);
                this.network.onUpdate = data => {
                    if (data.type == "draw") {
                        console.log("Updating draw");
                        self.onDrawUpdate(data);
                    }
                };
                break;
            }
            case 1: { // Host
                const self = this;
                this.network = new HostNetwork();
                this.network.onConnection = client => {
                    console.log("Player connected!");
                    console.log(client);
                };
                this.network.onUpdate = data => {
                    //sendToAllClients(data);
                    if (data.type == "draw") {
                        console.log("Updating draw");
                        self.onDrawUpdate(data);
                    }
                };
                break;
            }
        }
    }

    get isHost()
    {
        return this.mode == 1;
    }

    get isGameStarted()
    {
        return this.mode != -1;
    }

    connect(ip)
    {
        if (this.isHost) return;
        this.network.connect(ip);
    }

    sendDrawUpdate(clickX, clickY, clickDrag, clickColor)
    {
        console.log("sendDrawUpdate");
        if (this.isHost)
        {
            console.log("isHost");
            this.network.sendToAllClients({
                type: "draw",
                clickX,
                clickY,
                clickDrag,
                clickColor
            });
        }
        else 
        {
            console.log("!host")
            this.network.sendToHost({
                type: "draw",
                clickX,
                clickY,
                clickDrag,
                clickColor
            });
        }
    }

    onDrawUpdate(data)
    {
        console.log("onDrawUpdate");
        if (this.updateCanvas != null && data.type == "draw")
        {
            console.log("updcanvas ekki null og data draw");
            this.updateCanvas(data.clickX, data.clickY, data.clickDrag, data.clickColor);
        }
    }
}
