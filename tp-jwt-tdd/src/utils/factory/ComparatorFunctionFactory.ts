export class ComparatorFunctionFactory {
    static createComparatorFunction(type: string) {
        if (type.toUpperCase() === "EQUALS") {
            return (value: any, expectedValue: any) => {
                if (typeof value === "string") {
                    return value.toLowerCase() === expectedValue.toLowerCase();
                }
                return value === expectedValue;
            }
        }
        if (type.toUpperCase() === "HIGHER") {
            return (value: any, expectedValue: any) => {return value > expectedValue}
        }
        if (type.toUpperCase() === "LOWER") {
            return (value: any, expectedValue: any) => {return value < expectedValue}
        }
        if (type.toUpperCase() === "DISTINCT") {
            return (value: any, expectedValue: any) => {return value !== expectedValue}
        }
        if (type.toUpperCase() === "IN") {
            return (value: any, expectedValue: any) => {
                if (typeof value === "string") {
                    value = value.toLowerCase();
                }
                return expectedValue.map((v: any) => {
                    if (typeof v === "string") {
                        return v.toLowerCase();
                    }
                    return v;
                }).includes(value);
            }
        }
        if (type.toUpperCase() === "AND") {
            return (value: boolean[]) => {
                return value.reduce((a, b) => a && b)
            }
        }
        if (type.toUpperCase() === "OR") {
            return (value: boolean[]) => {
                return value.reduce((a, b) => a || b)
            }
        }
        if (type.toUpperCase() === "NOT") {
            return (value: any) => {
                return !value[0]; // This parameter is an array with one element
            }
        }
        if (type.toUpperCase() === "ETC") {
            return (value: any) => {return true}
        }
        throw new Error(`InvalidComparisonType: '${type}' is not a valid type for a comparison function`);
    }
}
