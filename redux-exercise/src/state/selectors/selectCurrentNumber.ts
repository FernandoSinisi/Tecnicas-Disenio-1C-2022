import {RootState} from '..';

export const selectCurrentNumber = (state: RootState): string => {
    return state.content.display.displayValue;
};
