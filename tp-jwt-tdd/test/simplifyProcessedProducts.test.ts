import { products } from "../src/utils/data";
import { simplifyProcessedProducts } from "../src/services/simplifyProcessedProducts";
import { ProcessedProduct } from "../src/services/processProducts";
import { Discount, DiscountType } from "../src/models/offerModel";

describe("simplify processed product", () => {
    let product = products[1]
    it("given only one discount validate simplified processed product discount ", () => {
        let discounts: Discount[] = [
            {
                type: DiscountType.PERCENTAGE,
                value: 10
            }
        ]
        let processedProduct: ProcessedProduct[] = [{product, discounts}]
        let expectedDiscount: Discount = {
            type: DiscountType.FIX,
            value: product.price * 0.1
        }

        const result = simplifyProcessedProducts(processedProduct);
        expect(result).toEqual([
            {discount: expectedDiscount, product: product}
        ]);
    });

    it("given only two discount validate simplified processed product discount ", () => {
        let discounts: Discount[] = [
            {
                type: DiscountType.PERCENTAGE,
                value: 10
            },
            {
                type: DiscountType.FIX,
                value: 50
            }
        ]
        let processedProduct: ProcessedProduct[] = [{product, discounts}]
        let expectedDiscount: Discount = {
            type: DiscountType.FIX,
            value: product.price * 0.1 + 50
        }
        const result = simplifyProcessedProducts(processedProduct);
        expect(result).toEqual([
            {discount: expectedDiscount, product: product}
        ]);
    });

    it("given only three discount validate simplified processed product discount ", () => {
        let discounts: Discount[] = [
            {
                type: DiscountType.PERCENTAGE,
                value: 10
            },
            {
                type: DiscountType.FIX,
                value: 50
            },
            {
                type: DiscountType.CART_PERCENTAGE,
                value: 20
            }
        ]
        let processedProduct: ProcessedProduct[] = [{product, discounts}]
        let expectedDiscount: Discount = {
            type: DiscountType.FIX,
            value: product.price * 0.1 + product.price * 0.2 + 50
        }
        const result = simplifyProcessedProducts(processedProduct);
        expect(result).toEqual([
            {discount: expectedDiscount, product: product}
        ]);
    });
});
