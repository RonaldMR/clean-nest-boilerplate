export default class InvalidAgeError extends Error {
  constructor() {
    super('Patient age cannot be lower than or equal to zero.');
  }
}
