import {Rule} from "../Rule";

export abstract class Atomic extends Rule {
    protected field: string;
    protected expectedValue: any;

    constructor(code: string, description: string, type: string, field: string, value: any) {
        super(code, description, type);
        this.field = field;
        this.expectedValue = value;
    }
}
