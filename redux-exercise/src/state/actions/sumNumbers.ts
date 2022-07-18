type sumNumbersAction = {
    type: 'SUM_NUMBERS';
    value: string
};

export const sumNumbers = (displayNumber: string): sumNumbersAction => ({
    type: 'SUM_NUMBERS',
    value: displayNumber
});