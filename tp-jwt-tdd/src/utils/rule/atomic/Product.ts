import { Atomic } from "./Atomic";
import { ProductWithData } from "../../../services/processProducts";

export class Product extends Atomic {
    appliesTo(data: { product?: ProductWithData["product"] }): boolean {
        if (!data.product) {
            return false;
        }
        let attributes = this.field.split(".")
        attributes.shift()
        var valueToCompare: string | number
        if (attributes.length == 1) {
            // @ts-ignore
            valueToCompare = data.product[attributes[0]]
        }
        if (attributes.length == 2) {
            // @ts-ignore
            valueToCompare = data.product[attributes[0]][attributes[1]]
        }
        // @ts-ignore
        return valueToCompare != null ? this.comparator(valueToCompare, this.expectedValue) : false
    }
}
