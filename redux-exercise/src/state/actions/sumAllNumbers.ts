type sumAllNumbersAction = {
    type: 'SUM_ALL_NUMBERS';
    value: string
};

export const sumAllNumbers = (displayNumber: string): sumAllNumbersAction => ({
    type: 'SUM_ALL_NUMBERS',
    value: displayNumber
});