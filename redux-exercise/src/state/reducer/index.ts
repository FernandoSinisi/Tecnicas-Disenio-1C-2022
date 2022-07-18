import {combineReducers} from 'redux';
import {displayReducer} from './displayReducer';
import {calculatorReducer} from './CalculatorReducer';
import {stackReducer} from "./stackReducer";

export const rootReducer = calculatorReducer(
    combineReducers({
        display: displayReducer,
        stack: stackReducer
    })
);
