import { Atomic } from "./Atomic";
import { ProductWithData } from "../../../services/processProducts";

export class Payment extends Atomic {
    appliesTo(data: { payment: ProductWithData["payment"] }): boolean {
        let attribute = this.field.split(".").pop()
        // @ts-ignore
        return data.payment[attribute] != null ? this.comparator(data.payment[attribute], this.expectedValue) : false
    }
}
