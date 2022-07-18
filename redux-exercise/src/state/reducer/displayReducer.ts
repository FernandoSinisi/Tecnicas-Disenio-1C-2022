import {Reducer} from 'redux';
import {AppAction} from '../AppAction';

type DisplayState = {
    displayValue: string;
    hasDecimalPoint: boolean;
    previousState: DisplayState | undefined
};

const initialState: DisplayState = {
    displayValue: '0',
    hasDecimalPoint: false,
    previousState: undefined
};

export const displayReducer: Reducer<DisplayState, AppAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NUMBER_TO_DISPLAY':
            return {
                displayValue: state.displayValue === '0' ? action.value.toString() : state.displayValue + action.value,
                hasDecimalPoint: state.hasDecimalPoint,
                previousState: state
            };
        case 'ADD_DECIMAL_POINT_TO_DISPLAY':
            return !state.hasDecimalPoint ?
                {
                    displayValue: state.displayValue + '.',
                    hasDecimalPoint: true,
                    previousState: state
                } :
                {
                    displayValue: state.displayValue,
                    hasDecimalPoint: state.hasDecimalPoint,
                    previousState: state
                };
        case 'RESET_DISPLAY':
            return {
                displayValue: '0',
                hasDecimalPoint: false,
                previousState: state
            };
        case 'UNDO_DISPLAY':
            if (state.previousState === undefined) return state;
            return state.previousState;
        default:
            return state;
    }
};
