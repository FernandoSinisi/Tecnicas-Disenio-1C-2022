type subNumbersAction = {
    type: 'SUB_NUMBERS';
    value: string
};

export const subNumbers = (displayNumber: string): subNumbersAction => ({
    type: 'SUB_NUMBERS',
    value: displayNumber
});