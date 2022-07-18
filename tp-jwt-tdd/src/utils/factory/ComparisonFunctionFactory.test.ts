
import {ComparatorFunctionFactory} from "./ComparatorFunctionFactory";

describe("Comparison Function Factory tests", () => {
    const GREATER_VALUE: number = 9;
    const LOWER_VALUE: number = 6;
    it("Get Equals function", () => {
        let equalFunction = ComparatorFunctionFactory.createComparatorFunction("equals");
        expect(equalFunction("SameValue", "SameValue")).toBeTruthy();
        expect(equalFunction("SomeValue", "DifferentValue")).toBeFalsy();
        expect(equalFunction("ABC", "abc")).toBeTruthy();
        expect(equalFunction(4, 4)).toBeTruthy();
    });

    it("Get Higher function", () => {
        let higherFunction = ComparatorFunctionFactory.createComparatorFunction("higher");
        expect(higherFunction(GREATER_VALUE, LOWER_VALUE)).toBeTruthy();
        expect(higherFunction(LOWER_VALUE, GREATER_VALUE)).toBeFalsy();
    });

    it("Get Lower function", () => {
        let lowerFunction = ComparatorFunctionFactory.createComparatorFunction("lower");
        expect(lowerFunction(LOWER_VALUE, GREATER_VALUE)).toBeTruthy();
        expect(lowerFunction(GREATER_VALUE, LOWER_VALUE)).toBeFalsy();
    });

    it("Get Distinct function", () => {
        let distinctFunction = ComparatorFunctionFactory.createComparatorFunction("distinct");
        expect(distinctFunction("SomeValue", "DifferentValue")).toBeTruthy();
        expect(distinctFunction("SameValue", "SameValue")).toBeFalsy();
    });

    it("Get In function", () => {
        let inFunction = ComparatorFunctionFactory.createComparatorFunction("in");
        expect(inFunction("SomeValue", ["SomeValue", "OtherValue"])).toBeTruthy();
        expect(inFunction("abc", ["ABC", "OtherValue"])).toBeTruthy();
        expect(inFunction("Value", ["SomeValue", "OtherValue"])).toBeFalsy();
    });

    it("Get And function", () => {
        let andFunction = ComparatorFunctionFactory.createComparatorFunction("and");
        // @ts-ignore
        expect(andFunction([true, true, true])).toBeTruthy();
        // @ts-ignore
        expect(andFunction([true, true, false])).toBeFalsy();
    });

    it("Get Or function", () => {
        let orFunction = ComparatorFunctionFactory.createComparatorFunction("or");
        // @ts-ignore
        expect(orFunction([false, false, true])).toBeTruthy();
        // @ts-ignore
        expect(orFunction([false, false, false])).toBeFalsy();
    });

    it("Get Not function", () => {
        let notFunction = ComparatorFunctionFactory.createComparatorFunction("not");
        // @ts-ignore
        expect(notFunction([false])).toBeTruthy();
        // @ts-ignore
        expect(notFunction([true])).toBeFalsy();
    });

    it("Get ETC function", () => {
        let etcFunction = ComparatorFunctionFactory.createComparatorFunction("etc");
        // @ts-ignore
        expect(etcFunction("SomeValue")).toBeTruthy()
    });

    it("An error is thrown if the type is invalid", () => {
        expect(() => {
            ComparatorFunctionFactory.createComparatorFunction("InvalidType");
        }).toThrow("InvalidComparisonType: 'InvalidType' is not a valid type for a comparison function");
    });
})
