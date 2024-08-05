import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  generateHash: (password: string, workload: number) => Promise<string>;
  validatePassword: (password: string, hash: string) => Promise<boolean>;
  generateHashSync: (password: string, workload: number) => string;
  validatePasswordSync: (password: string, hash: string) => boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BcryptCpp');
