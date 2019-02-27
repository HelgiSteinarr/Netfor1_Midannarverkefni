/*jshint esversion: 6 */
var server = require('http');
var io = require('socket.io');

export default class HostNetwork {

    constructor()
    {
        console.log("Running constructor for host network")
        this.connections = [];
        this.conn = io(3000);
        this.conn.on('connection', () => {
            console.log("Connected!")
        });
        // this.conn.on('connection', this.connected);
        this.onUpdate = data => {};
        this.onConnection = client => {};
        io.listen(3000);
    }

    connected(client)
    {
        console.log("Connected");
        console.log(client);
        this.connections.push(client);
        client.on('event', data => {
            console.log("Recieved data");
            console.log(data);
            this.onUpdate(JSON.parse(data));
        });
        client.on('disconnect', () => {
            console.log("Player disconnected");
        });
        this.onConnection(client);
    }

    sendToAllClients(data)
    {
        console.log("Sending data (sendToAllClients)")
        for (let client in this.connections) {
            client.send(JSON.stringify(data));
        }
    }

}
