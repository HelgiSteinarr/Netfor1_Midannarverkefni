/*jshint esversion: 6 */
var ClientNetwork = require('./clientNetwork.js');
var HostNetwork = require('./hostNetwork.js');

class Game {

    constructor(mode)
    {
        switch (mode) {
            case 0: { // Client 
                this.network = new ClientNetwork();
                this.network.onUpdate = (data) => {

                };

            }
        }
    }
}


module.exports = Game;