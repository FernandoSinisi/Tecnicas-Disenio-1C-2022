import {Rule} from "../rule/Rule";
import {Offer as OfferModel} from "../../models/offerModel";
import {Discount} from "../../models/offerModel";
import {ProductWithData} from "../../services/processProducts";
import {RuleFactory} from "../factory/RuleFactory";

export class Offer {
    protected readonly description: string;
    protected readonly code: string;
    protected rule: Rule;
    protected discount: Discount;

    constructor(offer: OfferModel) {
        this.description = offer.description;
        this.code = offer.code;
        this.rule = RuleFactory.createRule(offer.rule);
        this.discount = offer.discount;
    }

    getDiscount(): Discount {
        return this.discount;
    }

    appliesToProduct(product: ProductWithData): boolean {
        return this.rule.appliesTo(product);
    }
}
