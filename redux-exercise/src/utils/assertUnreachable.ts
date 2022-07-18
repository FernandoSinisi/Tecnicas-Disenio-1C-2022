/**
 * Ask the type checker to ensure there's no valid value for the argument.
 * Combine with type narrowing to make sure every possible type of a variable is handled
 *
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
 */
export function assertUnreachable(value: never) {
  return value;
}
