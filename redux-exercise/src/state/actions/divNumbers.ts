type divNumbersAction = {
    type: 'DIV_NUMBERS';
    value: string
};

export const divNumbers = (displayNumber: string): divNumbersAction => ({
    type: 'DIV_NUMBERS',
    value: displayNumber
});