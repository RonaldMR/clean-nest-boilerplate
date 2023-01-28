export default class ArgumentEmptyError extends Error {
  constructor(parameter: string) {
    super(`Parameter cannot be empty: (${parameter})`);
  }
}
