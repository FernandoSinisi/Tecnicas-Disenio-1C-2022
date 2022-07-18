import {Rule} from "./Rule";
import {Rule as RuleModel} from "../../models/ruleModel"
import {RuleFactory} from "../factory/RuleFactory"
import {ProductWithData} from "../../services/processProducts";

export class Compound extends Rule {
    private rules: Rule[];

    constructor(code: string, description: string, type: string, rules: RuleModel[]) {
        super(code, description, type);
        this.rules = this.getRules(rules);
    }

    appliesTo(data: ProductWithData): boolean {
        let results: boolean[] = [];
        this.rules.forEach((rule) => {
            results.push(rule.appliesTo(data));
        });
        return this.comparator(results);
    }

    private getRules(rules: RuleModel[]): Rule[] {
        let result: Rule[] = [];
        rules.forEach((rule: RuleModel) => {
            result.push(RuleFactory.createRule(rule));
        });
        return result;
    }
}
