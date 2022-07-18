import {ComparatorFunctionFactory} from "../factory/ComparatorFunctionFactory";
import {ProductWithData} from "../../services/processProducts";

export abstract class Rule {
    protected code: string;
    protected description: string;
    protected comparator: any;

    protected constructor(code: string, description: string, type: string) {
        this.code = code;
        this.description = description;
        this.comparator = ComparatorFunctionFactory.createComparatorFunction(type);
    }

    abstract appliesTo(data: ProductWithData): boolean;
}
