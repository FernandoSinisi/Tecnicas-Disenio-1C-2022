import {useSelector} from 'react-redux';
import {
    addDecimalPointToDisplay,
    addNumberToDisplay,
    addNumberToStack,
    divNumbers,
    doNothingStack,
    mulNumbers,
    resetDisplay,
    squareRoot,
    subNumbers,
    sumAllNumbers,
    sumNumbers,
    undoDisplay,
    undoStack
} from "../state/actions";
import {selectCurrentNumber} from 'state/selectors/selectCurrentNumber';
import {selectCurrentStack} from 'state/selectors/selectCurrentStack';
import styles from './Calculator.module.css';
import {store} from "../state";

const renderStackItem = (value: number, index: number) => {
    return <div key={index}>{value}</div>;
};

export const Calculator = () => {
    const currentNumber = useSelector(selectCurrentNumber);
    const stack = useSelector(selectCurrentStack);

    const onClickNumber = (n: number) => {
        store.dispatch(doNothingStack());
        store.dispatch(addNumberToDisplay(n));
    };

    const onClickDecimalPoint = () => {
        store.dispatch(doNothingStack());
        store.dispatch(addDecimalPointToDisplay());
    };

    const onClickIntro = () => {
        store.dispatch(addNumberToStack(currentNumber));
        store.dispatch(resetDisplay());
    };

    const onClickUndo = () => {
        store.dispatch(undoStack());
        store.dispatch(undoDisplay());
    };

    const onClickSum = () => {
        store.dispatch(sumNumbers(currentNumber));
        store.dispatch(resetDisplay());
    };

    const onClickSub = () => {
        store.dispatch(subNumbers(currentNumber));
        store.dispatch(resetDisplay());
    };

    const onClickMultiply = () => {
        store.dispatch(mulNumbers(currentNumber));
        store.dispatch(resetDisplay());
    };

    const onClickDiv = () => {
        store.dispatch(divNumbers(currentNumber));
        store.dispatch(resetDisplay());
    };

    const onClickSquareRoot = () => {
        store.dispatch(squareRoot(currentNumber));
        store.dispatch(resetDisplay());
    };

    const onClickSumAll = () => {
        store.dispatch(sumAllNumbers(currentNumber));
        store.dispatch(resetDisplay());
    };

    return (
        <div className={styles.main}>
            <div className={styles.display}>{currentNumber}</div>
            <div className={styles.numberKeyContainer}>
                {[...Array(9).keys()].map((i) => (
                    <button key={i} onClick={() => onClickNumber(i + 1)}>
                        {i + 1}
                    </button>
                ))}
                <button className={styles.zeroNumber} onClick={() => onClickNumber(0)}>
                    0
                </button>
                <button onClick={() => onClickDecimalPoint()}>.</button>
            </div>
            <div className={styles.opKeyContainer}>
                <button onClick={() => onClickSum()}>+</button>
                <button onClick={() => onClickSub()}>-</button>
                <button onClick={() => onClickMultiply()}>x</button>
                <button onClick={() => onClickDiv()}>/</button>
                <button onClick={() => onClickSquareRoot()}>√</button>
                <button onClick={() => onClickSumAll()}>Σ</button>
                <button onClick={() => onClickUndo()}>Undo</button>
                <button onClick={() => onClickIntro()}>Intro</button>
            </div>
            <div className={styles.stack}>{stack.map(renderStackItem)}</div>
        </div>
    );
};
