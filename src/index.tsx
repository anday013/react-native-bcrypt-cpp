import BcryptCpp from './NativeBcryptCpp';

export function generateHashSync(password: string, workload: number): string {
  return BcryptCpp.generateHashSync(password, workload);
}

export function validatePasswordSync(password: string, hash: string): boolean {
  return BcryptCpp.validatePasswordSync(password, hash);
}

export function generateHash(
  password: string,
  workload: number
): Promise<string> {
  return BcryptCpp.generateHash(password, workload);
}

export function validatePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return BcryptCpp.validatePassword(password, hash);
}
