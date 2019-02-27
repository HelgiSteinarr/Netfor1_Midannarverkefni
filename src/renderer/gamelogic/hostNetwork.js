/*jshint esversion: 6 */
var server = require('http');
var io = require('socket.io');

export default class HostNetwork {

    constructor()
    {
        console.log("Running constructor for host network")
        this.connections = [];
        this.conn = io(server);
<<<<<<< HEAD
        this.conn.on('connect', this.connected)
=======
        this.conn.on('connection', this.connected);
>>>>>>> dd04ff00689a728124404b5fd9a68f10db26661d
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
            this.onUpdate(JSON.parse(data));
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