import { ProcessedProduct, ProcessedSimplifiedProduct } from "./processProducts";
import { DiscountType } from "../models/offerModel";

export const simplifyProcessedProducts = (processedProducts: ProcessedProduct[]): ProcessedSimplifiedProduct[] => {
    return processedProducts.map((processProducts) => {
        let price = processProducts.product.price
        let finalDiscount = processProducts.discounts
            .map((discount) => discount.type == DiscountType.FIX ? discount.value : price * (discount.value / 100))
            .reduce((a, b) => a + b)
        return {
            discount: {
                type: DiscountType.FIX,
                value: finalDiscount
            },
            product: processProducts.product
        }
    })
}
