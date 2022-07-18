type mulNumbersAction = {
    type: 'MUL_NUMBERS';
    value: string
};

export const mulNumbers = (displayNumber: string): mulNumbersAction => ({
    type: 'MUL_NUMBERS',
    value: displayNumber
});