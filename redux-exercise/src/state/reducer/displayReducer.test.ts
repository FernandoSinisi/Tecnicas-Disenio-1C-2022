import {addDecimalPointToDisplay, addNumberToDisplay, addNumberToStack, resetDisplay, undoDisplay} from 'state/actions';
import { displayReducer } from './displayReducer';

describe('displayReducer', function () {
  it('initial state', () => {
    const initialState = displayReducer(undefined, { type: undefined as any });
    expect(initialState).toEqual({displayValue: '0', hasDecimalPoint: false, previousState: undefined});
  });

  it('do nothing case default', () => {
    const actualState = { displayValue: '6', hasDecimalPoint: false, previousState: undefined};
    const next = displayReducer(actualState, addNumberToStack("3"));
    expect(next).toEqual(actualState);
  });

  it('add number to display', () => {
    const actualState = { displayValue: '6', hasDecimalPoint: false, previousState: undefined};
    const expectedState = { displayValue: '63', hasDecimalPoint: false, previousState: actualState};
    const next = displayReducer(actualState, addNumberToDisplay(3));
    expect(next).toEqual(expectedState);
  });

  it('add decimal point to display', () => {
    const actualState = { displayValue: '6', hasDecimalPoint: false, previousState: undefined};
    const expectedState = { displayValue: '6.', hasDecimalPoint: true, previousState: actualState};
    const next = displayReducer(actualState, addDecimalPointToDisplay());
    expect(next).toEqual(expectedState);
  });

  it('add decimal point to display when it already had one', () => {
    const actualState = { displayValue: '6.5', hasDecimalPoint: true, previousState: undefined};
    const expectedState = { displayValue: '6.5', hasDecimalPoint: true, previousState: actualState};
    const next = displayReducer(actualState, addDecimalPointToDisplay());
    expect(next).toEqual(expectedState);
  });

  it('reset display', () => {
    const actualState = { displayValue: '6.5', hasDecimalPoint: true, previousState: undefined};
    const expectedState = { displayValue: '0', hasDecimalPoint: false, previousState: actualState};
    const next = displayReducer(actualState, resetDisplay());
    expect(next).toEqual(expectedState);
  });

  it('undo display without previous state', () => {
    const actualState = { displayValue: '0', hasDecimalPoint: false, previousState: undefined};
    const next = displayReducer(actualState, undoDisplay());
    expect(next).toEqual(actualState);
  });

  it('undo display', () => {
    const previousState = { displayValue: '6.', hasDecimalPoint: true, previousState: undefined};
    const actualState = { displayValue: '6.5', hasDecimalPoint: true, previousState: previousState};
    const expectedState = { displayValue: '6.', hasDecimalPoint: true, previousState: undefined};
    const next = displayReducer(actualState, undoDisplay());
    expect(next).toEqual(expectedState);
  });
});
