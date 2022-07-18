import { ShoppingCart } from "../models/shoppingCartModel";
import { State } from "./initializeOffers";
import { Offer } from "../utils/offer/Offer";
import { Product } from "../models/productModel";
import { Discount, DiscountType } from "../models/offerModel";

export type ProductWithData = {
    product?: Product,
    purchase_date: ShoppingCart['purchase_date'],
    payment: ShoppingCart['payment']
}

export interface ProcessedProduct {
    product: Product;
    discounts: Discount[];
}

export interface ProcessedSimplifiedProduct {
    product: Product;
    discount: Discount;
}

export const processProducts = (state: State, cart: ShoppingCart) => {
    let offers: Offer[] = [];
    let processedProducts: ProcessedProduct[] = [];

    state.offers.forEach((offer) => {
        offers.push(new Offer(offer));
    });

    cart.products.forEach((product) => {
        let discounts: Discount[] = [];
        offers.forEach((offer) => {
            if (offer.appliesToProduct({product, payment: cart.payment, purchase_date: cart.purchase_date})) {
                discounts.push(offer.getDiscount());
            }
        });
        if (discounts.length > 0) {
            discounts.sort((a, b) => {
                if(a.type === b.type) {
                    return b.value - a.value;
                }

                return a.type.localeCompare(b.type)
            })
            processedProducts.push({discounts, product});
        }
    });

    return processedProducts;
}
