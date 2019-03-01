/*jshint esversion: 6 */
var server = require('http');
var io = require('socket.io');

export default class HostNetwork {

    constructor()
    {
        let self = this;
        this.connections = [];
        this.conn = io(3000);
        this.conn.on('connection', client => {
            self.connected(client);
        });
        // this.conn.on('connection', this.connected);
        this.onUpdate = data => {};
        this.onConnection = client => {};
        io.listen(3000);
    }

    connected(client)
    {
        console.log("Connected");
        this.connections.push(client);
        client.on('message', (data) => {
            this.onUpdate(JSON.parse(data));
        });
        client.on('disconnect', () => {
            console.log("Player disconnected");
        });
        this.onConnection(client);
    }

    sendToAllClients(data)
    {
        for (let client of this.connections) {
            client.emit("message", JSON.stringify(data));
        }
    }

}
