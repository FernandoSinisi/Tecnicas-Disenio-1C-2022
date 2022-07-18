import {Compound} from "../rule/Compound";
import {Product} from "../rule/atomic/Product";
import {Calendar} from "../rule/atomic/Calendar";
import {Payment} from "../rule/atomic/Payment";
import {RuleFactory} from "./RuleFactory";
import {Rule} from "../../models/ruleModel";

describe("Rule Factory tests", () => {
    const rule: Rule = {
        code: "0x0069",
        description: "This is an auxiliary rule for some tests",
        type: "IN",
        field: "PRODUCT.code",
        value: ["0x0012", "0x0013"],
        rules: [""]
    }

    it("Compound rule is created correctly", () => {
        const result = RuleFactory.createRule({
            code: "69",
            description: "Random Rule",
            type: "AND",
            field: undefined,
            value: null,
            rules: [rule]
        });
        expect(result).toBeInstanceOf(Compound);
    });

    it("Product rule is created correctly", () => {
        const result = RuleFactory.createRule({
            code: "69",
            description: "Random Rule",
            type: "EQUALS",
            field: "PRODUCT.code",
            value: ["0x0012"],
            rules: [""]
        });
        expect(result).toBeInstanceOf(Product);
    });

    it("Calendar rule is created correctly", () => {
        const result = RuleFactory.createRule({
            code: "69",
            description: "Random Rule",
            type: "EQUALS",
            field: "CALENDAR.month",
            value: [9],
            rules: [""]
        });
        expect(result).toBeInstanceOf(Calendar);
    });

    it("Payment rule is created correctly", () => {
        const result = RuleFactory.createRule({
            code: "69",
            description: "Random Rule",
            type: "IN",
            field: "PAYMENT.entity",
            value: ["MACRO", "VISA"],
            rules: [""]
        });
        expect(result).toBeInstanceOf(Payment);
    });

    it("An error is thrown if the type of an atomic rule is invalid", () => {
        const result = RuleFactory.createRule({
            code: "69",
            description: "Random Rule",
            type: "IN",
            field: "PAYMENT.entity",
            value: ["MACRO", "VISA"],
            rules: [""]
        });
        expect(() => {
            RuleFactory.createRule({
                code: "69",
                description: "Random Rule",
                type: "IN",
                field: "INVALID_TYPE.entity",
                value: ["MACRO", "VISA"],
                rules: [""]
            });
        }).toThrow("InvalidTypeForAtomicRule: 'INVALID_TYPE' is not a valid type for an atomic rule");
    });
})
