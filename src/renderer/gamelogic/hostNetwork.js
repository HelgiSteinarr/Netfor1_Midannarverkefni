var server = require('http');
var io = require('socket.io');

export default class HostNetwork {

    constructor()
    {
        this.connections = [];
        this.conn = io(server);
        this.conn.on('connection', this.connected)
        this.onUpdate = data => {};
        this.onConnection = client => {};
    }

    connected(client)
    {
        console.log(client);
        this.connections.push(client);
        client.on('event', data => {
            this.onUpdate(data);
        });
        client.on('disconnect', () => {
            console.log("Player disconnected");
        });
        this.onConnection(client);
    }

    sendToAllClients(data)
    {
        for (let client in this.connections) {
            client.send(JSON.stringify(data));
        }
    }

}