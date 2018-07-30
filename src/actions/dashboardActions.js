import { PERIOD_CHANGED, HISTORY_RESULTS_RECEIVED } from '../types';
import api from '../api';

const historyResultsReceived = history => {
    return {
        type: HISTORY_RESULTS_RECEIVED,
        payload: history
    };
};

const periodChanged = period => {
    return {
        type: PERIOD_CHANGED,
        payload: period
    };
};

export const changePeriod = (periodType, socketId) => {
    return dispatch => {
        return api.period.changePeriod(periodType, socketId)
            .then(newPeriodType => {
                dispatch(periodChanged(newPeriodType));
            });
    };
};

export const getHistory = (socketId, last, periodType) => {
    return dispatch => {
        return api.history.getHistory(socketId, last, periodType)
            .then(results => {
                dispatch(historyResultsReceived({results, last}));
            });
    };
};


