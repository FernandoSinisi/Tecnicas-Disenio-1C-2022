type doNothingStackAction = {
    type: 'DO_NOTHING_STACK';
};

export const doNothingStack = (): doNothingStackAction => ({
    type: 'DO_NOTHING_STACK',
});