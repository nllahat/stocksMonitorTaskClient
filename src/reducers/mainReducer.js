import { USER_CONNECT, USER_DISCONNECT, STOCK_VALUE_RECEIVED, PERIOD_CHANGED, HISTORY_RESULTS_RECEIVED } from '../types';
import { periodMaxDiff } from '../settings';

const MAX_STOCK_VALUES_SIZE = 100;
const INITIAL_STATE = {
    username: '',
    socketId: '',
    stockValues: [],
    startTime: new Date().getTime(),
    currentPeriod: 1,
    currentHistory: null,
    historyResult: null
};

export default function main(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case USER_CONNECT:
            if (state.socketId && state.socketId !== action.payload.socketId) {
                state.socketId = action.payload.socketId;

                return { ...state };
            }

            return { ...state, ...INITIAL_STATE, socketId: action.payload.socketId, username: action.payload.username };
        case USER_DISCONNECT:
            return INITIAL_STATE;
        case STOCK_VALUE_RECEIVED:
            state.stockValues = state.stockValues.map(stockValue => Object.assign({}, stockValue));

            if (state.stockValues && state.stockValues.length) {
                let diff = state.stockValues[state.stockValues.length - 1].x - state.startTime;
                let diffInMin = Math.round(((diff % 86400000) % 3600000) / 60000);

                if (diffInMin > periodMaxDiff[state.currentPeriod] || state.stockValues.length === MAX_STOCK_VALUES_SIZE) {
                    state.stockValues.shift();
                }
            }

            state.stockValues.push(action.payload);

            return { ...state };
        case PERIOD_CHANGED:
            state.currentPeriod = action.payload;

            return { ...state };
        case HISTORY_RESULTS_RECEIVED:
            state.currentHistory = action.payload.last;
            state.historyResult = action.payload.results;

            return { ...state };
        default:
            return state
    }
}
