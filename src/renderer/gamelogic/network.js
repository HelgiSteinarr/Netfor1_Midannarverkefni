import io from 'socket.io-client';

class ClientConnections {

    constructor()
    {

    }

}

class HostConnection {

    constructor()
    {
        
    }

    connect(ip)
    {
        this.conn = io(ip);
    }

    send(data)
    {
        this.conn.send(data);
    }
}

class Network {

    constructor(mode)
    {
        switch (mode) {
            case 0: {
                this.connections = [];
                this.onUpdate = () => {};
                break;
            }
            case 1: {
                this.hostConnection = new Connection();
            }
        }
    }

    
}

module.exports = Network;
