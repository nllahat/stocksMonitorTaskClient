const FIVE_MIN = 5;
const TEN_MIN_IN_SECONDS = 600;
const TEN_MIN_IN_MS = 600000;

export const periodTypes = {
    1: '10 sec',
    2: '30 sec',
    3: '1 min',
    4: '5 min'
};

export const periodMaxDiff = {
    1: FIVE_MIN,
    2: FIVE_MIN + 1,
    3: FIVE_MIN + 2,
    4: FIVE_MIN + 3
};

export const historyMap = {
    1: TEN_MIN_IN_SECONDS, // 10 min
    2: TEN_MIN_IN_SECONDS * 3, // 30 min
    4: TEN_MIN_IN_SECONDS * 6 // 1 hour
};

export const historyMapMilliseconds = {
    1: TEN_MIN_IN_MS, // 10 min
    2: TEN_MIN_IN_MS * 3, // 30 min
    4: TEN_MIN_IN_MS * 6 // 1 hour
};
