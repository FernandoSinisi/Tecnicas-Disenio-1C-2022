import {Rule} from "../rule/Rule";
import {Rule as RuleModel} from "../../models/ruleModel"
import {Compound} from "../rule/Compound";
import {Product} from "../rule/atomic/Product";
import {Calendar} from "../rule/atomic/Calendar";
import { Payment } from "../rule/atomic/Payment";

export class RuleFactory {
    private static COMPOUND_RULES = ["and", "or", "not"];
    private static ATOMIC_RULES = ["equals", "higher", "lower", "distinct", "in"];

    static createRule(rule: RuleModel): Rule {
        if (this.COMPOUND_RULES.includes(rule.type.toLowerCase())) {
            // @ts-ignore
            return new Compound(rule.code, rule.description, rule.type, rule.rules);
        }
        if (this.ATOMIC_RULES.includes(rule.type.toLowerCase())) {
            let ruleType = rule.field?.split(".")[0];
            if (ruleType === "PRODUCT") {
                return new Product(rule.code!!, rule.description!!, rule.type, rule.field!!, rule.value);
            }
            if (ruleType === "CALENDAR") {
                return new Calendar(rule.code!!, rule.description!!, rule.type, rule.field!!, rule.value);
            }
            if (ruleType === "PAYMENT") {
                return new Payment(rule.code!!, rule.description!!, rule.type, rule.field!!, rule.value);
            }
            throw new Error(`InvalidTypeForAtomicRule: '${ruleType}' is not a valid type for an atomic rule`);
        }
        throw new Error(`InvalidRuleType: '${rule.type}' is not a valid type for a rule`);
    }
}
