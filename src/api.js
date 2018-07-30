import axios from 'axios';
import { historyMap } from './settings';

export default {
    period: {
        changePeriod: (periodType, socketId) =>
            axios.get(`/api/changePeriod/${socketId}/${periodType}`)
                .then(res => res.data.period)
    },
    history: {
        getHistory: (socketId, lastType, periodType) =>
            axios.get(`/api/getHistory/${socketId}/${historyMap[lastType] || historyMap[1]}/${periodType}`)
                .then(res => res.data.aggregatedStockValues)
    }
};
