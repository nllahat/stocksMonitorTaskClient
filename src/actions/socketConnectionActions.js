import { USER_CONNECT, USER_DISCONNECT, STOCK_VALUE_RECEIVED } from '../types';
import SocketIO from '../socketHandler';

const userConnected = (socketId, username) => {
    return {
        type: USER_CONNECT,
        payload: { socketId, username }
    };
};

const userDisconnected = () => {
    return {
        type: USER_DISCONNECT
    };
};

const stockValueReceived = stock => {
    return {
        type: STOCK_VALUE_RECEIVED,
        payload: stock
    };
};

export const connectSocket = (socketId, username, cb) => {
    return dispatch => {
        dispatch(userConnected(socketId, username));
        cb();
    };
};

export const disconnectSocket = () => {
    return dispatch => {
        dispatch(userDisconnected());
    };
};

export const clientDisconnectSocket = () => {
    return dispatch => {
        SocketIO.instance.clientDisconnect();
        dispatch(userDisconnected());
    };
};

export const stockValueReceivedFromSocket = stockValue => {
    return dispatch => {
        dispatch(stockValueReceived(stockValue));
    };
};

