import {stackReducer} from './stackReducer';
import {
    addNumberToStack,
    divNumbers,
    doNothingStack,
    mulNumbers,
    squareRoot,
    subNumbers, sumAllNumbers,
    sumNumbers,
    undoStack
} from "../actions";

describe('stackReducer', function () {
    it('initial state', () => {
        const initialState = stackReducer(undefined, {type: undefined as any});
        expect(initialState).toEqual({values: [], previousState: undefined});
    });

    it('add number to empty stack', () => {
        const actualState = {values: [], previousState: undefined};
        const expected = {values: [6], previousState: actualState};
        const next = stackReducer(actualState, addNumberToStack("6"));
        expect(next).toEqual(expected);
    });

    it('add number to non empty stack', () => {
        const actualState = {values: [56, 7], previousState: undefined};
        const expected = {values: [56, 7, 8], previousState: actualState};
        const next = stackReducer(actualState, addNumberToStack("8"));
        expect(next).toEqual(expected);
    });

    it('undo stack without previous state', () => {
        const actualState = {values: [], previousState: undefined};
        const next = stackReducer(actualState, undoStack());
        expect(next).toEqual(actualState);
    });

    it('undo stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousState = {values: [7], previousState: initialState};
        const actualState = {values: [7, 8], previousState: previousState};
        const expectedState = {values: [7], previousState: initialState};
        const next = stackReducer(actualState, undoStack());
        expect(next).toEqual(expectedState);
    });

    it('do nothing stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousState = {values: [7], previousState: initialState};
        const actualState = {values: [7, 8], previousState: previousState};
        const expectedState = {values: [7, 8], previousState: actualState};
        const next = stackReducer(actualState, doNothingStack());
        expect(next).toEqual(expectedState);
    });

    it('do nothing stack without previous state', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [], previousState: initialState};
        const next = stackReducer(initialState, doNothingStack());
        expect(next).toEqual(expectedState);
    });

    it('sum numbers from the stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousState = {values: [7], previousState: initialState};
        const actualState = {values: [7, 8], previousState: previousState};
        const expectedState = {values: [15], previousState: actualState};
        const next = stackReducer(actualState, sumNumbers("0"));
        expect(next).toEqual(expectedState);
    });

    it('sum numbers, one from display and other from the stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousState = {values: [7], previousState: initialState};
        const actualState = {values: [7, 8], previousState: previousState};
        const expectedState = {values: [7, 10], previousState: actualState};
        const next = stackReducer(actualState, sumNumbers("2"));
        expect(next).toEqual(expectedState);
    });

    it('sum numbers with empty stack', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [], previousState: initialState};
        const next = stackReducer(initialState, sumNumbers("0"));
        expect(next).toEqual(expectedState);
    });

    it('sum numbers with empty stack and current number != 0', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [1], previousState: initialState};
        const next = stackReducer(initialState, sumNumbers("1"));
        expect(next).toEqual(expectedState);
    });

    it('sub numbers from the stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousState = {values: [12], previousState: initialState};
        const actualState = {values: [12, 4], previousState: previousState};
        const expectedState = {values: [8], previousState: actualState};
        const next = stackReducer(actualState, subNumbers("0"));
        expect(next).toEqual(expectedState);
    });

    it('sub numbers, one from display and other from the stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousState = {values: [7], previousState: initialState};
        const actualState = {values: [7, 8], previousState: previousState};
        const expectedState = {values: [7, 6], previousState: actualState};
        const next = stackReducer(actualState, subNumbers("2"));
        expect(next).toEqual(expectedState);
    });

    it('sub numbers with empty stack', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [], previousState: initialState};
        const next = stackReducer(initialState, subNumbers("0"));
        expect(next).toEqual(expectedState);
    });

    it('sub numbers with empty stack and current number != 0', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [1], previousState: initialState};
        const next = stackReducer(initialState, subNumbers("1"));
        expect(next).toEqual(expectedState);
    });

    it('mul numbers from the stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousState = {values: [12], previousState: initialState};
        const actualState = {values: [12, 4], previousState: previousState};
        const expectedState = {values: [48], previousState: actualState};
        const next = stackReducer(actualState, mulNumbers("0"));
        expect(next).toEqual(expectedState);
    });

    it('mul numbers, one from display and other from the stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousState = {values: [7], previousState: initialState};
        const actualState = {values: [7, 8], previousState: previousState};
        const expectedState = {values: [7, 16], previousState: actualState};
        const next = stackReducer(actualState, mulNumbers("2"));
        expect(next).toEqual(expectedState);
    });

    it('mul numbers with empty stack', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [], previousState: initialState};
        const next = stackReducer(initialState, mulNumbers("0"));
        expect(next).toEqual(expectedState);
    });

    it('mul numbers with empty stack and current number != 0', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [1], previousState: initialState};
        const next = stackReducer(initialState, mulNumbers("1"));
        expect(next).toEqual(expectedState);
    });

    it('div numbers from the stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousState = {values: [12], previousState: initialState};
        const actualState = {values: [12, 4], previousState: previousState};
        const expectedState = {values: [3], previousState: actualState};
        const next = stackReducer(actualState, divNumbers("0"));
        expect(next).toEqual(expectedState);
    });

    it('div numbers, one from display and other from the stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousState = {values: [7], previousState: initialState};
        const actualState = {values: [7, 8], previousState: previousState};
        const expectedState = {values: [7, 4], previousState: actualState};
        const next = stackReducer(actualState, divNumbers("2"));
        expect(next).toEqual(expectedState);
    });

    it('div numbers with empty stack', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [], previousState: initialState};
        const next = stackReducer(initialState, divNumbers("0"));
        expect(next).toEqual(expectedState);
    });

    it('div numbers with empty stack and current number != 0', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [1], previousState: initialState};
        const next = stackReducer(initialState, divNumbers("1"));
        expect(next).toEqual(expectedState);
    });

    it('square root from the stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousState = {values: [12], previousState: initialState};
        const actualState = {values: [12, 4], previousState: previousState};
        const expectedState = {values: [12, 2], previousState: actualState};
        const next = stackReducer(actualState, squareRoot("0"));
        expect(next).toEqual(expectedState);
    });

    it('square root from display', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [4], previousState: initialState};
        const next = stackReducer(initialState, squareRoot("16"));
        expect(next).toEqual(expectedState);
    });

    it('square root with empty stack', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [], previousState: initialState};
        const next = stackReducer(initialState, squareRoot("0"));
        expect(next).toEqual(expectedState);
    });

    it('sum all numbers from the stack', () => {
        const initialState = {values: [], previousState: undefined};
        const previousPreviousState = {values: [12], previousState: initialState};
        const previousState = {values: [12, 4], previousState: previousPreviousState};
        const actualState = {values: [12, 4, 3], previousState: previousState};
        const expectedState = {values: [19], previousState: actualState};
        const next = stackReducer(actualState, sumAllNumbers("0"));
        expect(next).toEqual(expectedState);
    });

    it('sum all numbers more one from display', () => {
        const initialState = {values: [], previousState: undefined};
        const previousPreviousState = {values: [12], previousState: initialState};
        const previousState = {values: [12, 4], previousState: previousPreviousState};
        const actualState = {values: [12, 4, 3], previousState: previousState};
        const expectedState = {values: [21], previousState: actualState};
        const next = stackReducer(actualState, sumAllNumbers("2"));
        expect(next).toEqual(expectedState);
    });

    it('sum all numbers with empty stack', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [], previousState: initialState};
        const next = stackReducer(initialState, sumAllNumbers("0"));
        expect(next).toEqual(expectedState);
    });

    it('sum all numbers with empty stack and current number != 0', () => {
        const initialState = {values: [], previousState: undefined};
        const expectedState = {values: [1], previousState: initialState};
        const next = stackReducer(initialState, sumAllNumbers("1"));
        expect(next).toEqual(expectedState);
    });
});
