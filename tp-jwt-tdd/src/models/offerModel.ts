import { Rule } from "./ruleModel";

export enum DiscountType {
    PERCENTAGE = "PRODUCT_PERCENTAGE",
    FIX = "FIX",
    CART_PERCENTAGE = "CART_PERCENTAGE",
}

export type Discount = {
    value: number;
    type: DiscountType;
}

export type Offer = {
    description: string;
    code: string;
    rule: Rule;
    discount: Discount;
}
