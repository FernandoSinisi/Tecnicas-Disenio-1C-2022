type addNumberToDisplayAction = {
    type: 'ADD_NUMBER_TO_DISPLAY';
    value: number
};

export const addNumberToDisplay = (n: number): addNumberToDisplayAction => ({
    type: 'ADD_NUMBER_TO_DISPLAY',
    value: n
});