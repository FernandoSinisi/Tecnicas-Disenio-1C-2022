export type RuleType = "EQUALS" | "HIGHER" | "LOWER" | "DISTINCT" | "IN" | "AND" | "OR" | "NOT";

export type RuleReference = string;

export type Rule = {
    code?: string;
    description?: string;
    type: RuleType;
    field?: string;
    value: any;
    rules: Rule[] | RuleReference[];
}

