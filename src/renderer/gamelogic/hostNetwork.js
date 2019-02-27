var server = require('http');
var io = require('socket.io');

export default class HostNetwork {

    constructor()
    {
        console.log("Running constructor for host network")
        this.connections = [];
        this.conn = io(server);
        this.conn.on('connect', this.connected)
        this.onUpdate = data => {};
        this.onConnection = client => {};
        io.listen(3000);
    }

    connected(client)
    {
        console.log("Connected")
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