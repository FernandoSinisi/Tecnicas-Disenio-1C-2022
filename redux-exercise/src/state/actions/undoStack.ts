type undoStackAction = {
    type: 'UNDO_STACK';
};

export const undoStack = (): undoStackAction => ({
    type: 'UNDO_STACK',
});