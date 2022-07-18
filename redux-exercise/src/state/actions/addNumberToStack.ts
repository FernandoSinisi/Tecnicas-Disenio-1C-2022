type addNumberToStackAction = {
    type: 'ADD_NUMBER_TO_STACK';
    value: string
};

export const addNumberToStack = (displayNumber: string): addNumberToStackAction => ({
    type: 'ADD_NUMBER_TO_STACK',
    value: displayNumber
});