import { Atomic } from "./Atomic";
import { ProductWithData } from "../../../services/processProducts";

export class Calendar extends Atomic {
    appliesTo(data: { purchase_date: ProductWithData["purchase_date"] }): boolean {
        let attribute = this.field.split(".").pop()
        // @ts-ignore
        return data.purchase_date[attribute] != null ? this.comparator(data.purchase_date[attribute], this.expectedValue) : false
    }
}
