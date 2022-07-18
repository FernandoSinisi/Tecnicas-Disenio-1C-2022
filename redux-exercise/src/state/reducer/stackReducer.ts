import {Reducer} from 'redux';
import {AppAction} from '../AppAction';

type StackState = {
    values: Array<number>
    previousState: StackState | undefined
};

const initialState: StackState = {
    values: [],
    previousState: undefined
};

interface MathOperation {
    operation: (n1: number, n2: number) => number,
    currentNumber: string,
    actualState: StackState
}

export const stackReducer: Reducer<StackState, AppAction> = (state = initialState, action) => {
    let newValues = state.values.slice();
    switch (action.type) {
        case 'ADD_NUMBER_TO_STACK':
            return {
                values: state.values.concat(parseFloat(action.value)),
                previousState: state
            };
        case 'SUM_NUMBERS':
            return doMathOperation({
                    operation: (n1, n2) => n1 + n2,
                    currentNumber: action.value,
                    actualState: state
                }
            );
        case 'SUB_NUMBERS':
            return doMathOperation({
                    operation: (n1, n2) => n2 - n1,
                    currentNumber: action.value,
                    actualState: state
                }
            );
        case 'MUL_NUMBERS':
            return doMathOperation({
                    operation: (n1, n2) => n1 * n2,
                    currentNumber: action.value,
                    actualState: state
                }
            );
        case 'DIV_NUMBERS':
            return doMathOperation({
                    operation: (n1, n2) => n2 / n1,
                    currentNumber: action.value,
                    actualState: state
                }
            );
        case 'SQUARE_ROOT':
            if (action.value !== '0') newValues = newValues.concat(parseFloat(action.value));
            if (newValues.length !== 0) newValues = newValues.concat(Math.sqrt(Number(newValues.pop())));
            return {
                values: newValues,
                previousState: state
            };
        case 'SUM_ALL_NUMBERS':
            if (action.value !== '0') newValues = newValues.concat(parseFloat(action.value));
            if (newValues.length !== 0) newValues = [newValues.reduce((n1, n2) => n1 + n2)];
            return {
                values: newValues,
                previousState: state
            };
        case 'UNDO_STACK':
            if (state.previousState === undefined) return state;
            return state.previousState;
        case 'DO_NOTHING_STACK':
            return {
                values: state.values,
                previousState: state
            }
        default:
            return state;
    }
};

const doMathOperation = ({operation, currentNumber, actualState}: MathOperation) => {
    let newValues = actualState.values.slice();
    if (currentNumber !== '0') newValues = newValues.concat(parseFloat(currentNumber));
    if (newValues.length < 2) return {values: newValues, previousState: actualState};
    const num1 = Number(newValues.pop());
    const num2 = Number(newValues.pop());
    newValues = newValues.concat(operation(num1, num2));
    return {values: newValues, previousState: actualState};
}