type undoDisplayAction = {
    type: 'UNDO_DISPLAY';
};

export const undoDisplay = (): undoDisplayAction => ({
    type: 'UNDO_DISPLAY',
});