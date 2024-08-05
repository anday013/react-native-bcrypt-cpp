const BcryptCpp = require('./NativeBcryptCpp').default;

export function multiply(a: number, b: number): number {
  return BcryptCpp.multiply(a, b);
}
