import { Discount, Offer } from "../models/offerModel";
import { Rule } from "../models/ruleModel";

export interface State {
  offers: Offer[];
  rules: Rule[];
}

export interface Offers {
  rules: Rule[];
  offers: Offer[];
}

const validateComplexRule = (rule: Rule, rules: Rule[]): Rule => {
  if (rule.rules == null) {
    throw new Error(`InvalidParams: You must define a internal rules for complex rule ${JSON.stringify(rule)}`)
  }
  let newRule = [rule.rules].flat()
  rule.rules = newRule.map((rule) =>
      typeof rule === "string" ? rules.filter((internalRule, index, array) => internalRule.code == rule)[0] : validateRule(rule as Rule, rules, true)
  )

  return rule
}

const validateAtomicRule = (rule: Rule): Rule => {
  if (rule.code == null) {
    throw new Error(`InvalidParams: You must define a code for ${JSON.stringify(rule)}`)
  }
  if (rule.description == null) {
    throw new Error(`InvalidParams: You must define a description for ${JSON.stringify(rule)}`)
  }
  return validateInternalAtomicRule(rule)
}

const validateInternalAtomicRule = (rule: Rule): Rule => {
  if (rule.field == null) {
    throw new Error(`InvalidParams: You must define a field for ${JSON.stringify(rule)}`)
  }
  if (rule.value == null) {
    throw new Error(`InvalidParams: You must define a value for ${JSON.stringify(rule)}`)
  }
  return rule
}

const validateRule = (rule: Rule, rules: Rule[], isInternal: boolean): Rule => {

  if (rule.type == null) {
    throw new Error(`InvalidParams: You must define a type for ${JSON.stringify(rule)}`)
  }

  if (["AND", "OR", "NOT"].includes(rule.type)) {
    validateComplexRule(rule, rules)
  } else if(isInternal){
    validateInternalAtomicRule(rule)
  } else {
    validateAtomicRule(rule)
  }

  return rule
}


const validateDiscount = (discount: Discount): Discount => {
  if (discount.type == null) {
    throw new Error(`InvalidParams: You must define a discount for ${JSON.stringify(discount)}`)
  }

  if (discount.value == null) {
    throw new Error(`InvalidParams: You must define a value for ${JSON.stringify(discount)}`)
  }
  return discount
}

const validateOffer = (offer: Offer, rules: Rule[]): Offer => {
  if (offer.code == null) {
    throw new Error(`InvalidParams: You must define a code for ${JSON.stringify(offer)}`)
  }

  if (offer.description == null) {
    throw new Error(`InvalidParams: You must define a description for ${JSON.stringify(offer)}`)
  }

  validateRule(offer.rule, rules, true)
  validateDiscount(offer.discount)
  return offer
}

export const initializeOffers = (offers: Offers) => {
  let newRules = offers.rules.map((rule, index, array) => validateRule(rule, array, false))
  let newOffer = offers.offers.map((offer, index, array) => validateOffer(offer, newRules))
  const state: State = {
    offers: newOffer,
    rules: newRules}
  return state
}
