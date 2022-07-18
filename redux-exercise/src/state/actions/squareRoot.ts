type squareRootAction = {
    type: 'SQUARE_ROOT';
    value: string
};

export const squareRoot = (displayNumber: string): squareRootAction => ({
    type: 'SQUARE_ROOT',
    value: displayNumber
});