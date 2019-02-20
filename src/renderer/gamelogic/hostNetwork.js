var server = require('http');
var io = require('socket.io');

export default class HostNetwork {

    constructor()
    {
        this.connections = [];
        this.conn = io(server);
        this.conn.on('connection', this.onConnection)
        this.onUpdate = (data) => {};
    }

    onConnection(client)
    {
        this.connections.push(client);
        client.on('event', (data) => {
            this.onUpdate(data);
        });
        client.on('disconnect', () => {
            console.log("Player disconnected")
        });
    }

}