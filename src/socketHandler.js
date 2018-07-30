import * as actions from './actions/socketConnectionActions';
import io from 'socket.io-client';
import reduxStore from './reduxStore';

let singleton = Symbol();
let singletonEnforcer = Symbol();

class SocketSingleton {

    /**
     * @param enforcer
     */
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw "Cannot construct singleton"
        }

        this.socket = null;
    }

    /**
     * @returns SocketSingleton
     */
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new SocketSingleton(singletonEnforcer);
        }

        return this[singleton];
    }

    clientConnect(username, cb) {
        let self = this;

        this.socket = io.connect('http://localhost:8080', {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax : 5000,
            reconnectionAttempts: 3
        });

        this.socket.on('connect', () => {
            reduxStore.dispatch(actions.connectSocket(self.socket.id, username, cb));

            this.clientStart(username);
        });

        this.socket.on('connect_error', cb);

        this.socket.on('error', err => {
            console.log(err);
            self.socket.close();
        });
    }

    clientStart(username) {
        this.socket.emit('start', { username });
        this.socket.on('newNumber', stockValue => {
            reduxStore.dispatch(actions.stockValueReceivedFromSocket(stockValue));
        });
    }

    clientDisconnect() {
        this.socket.close();
    }
}

export default SocketSingleton;
