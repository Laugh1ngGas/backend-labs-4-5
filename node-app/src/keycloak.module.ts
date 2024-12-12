import { DynamicModule, Module } from '@nestjs/common';
import { KeycloakConnectModule, KeycloakConnectOptions } from 'nest-keycloak-connect';

@Module({})
export class KeycloakModule {
  static register(options: KeycloakConnectOptions): DynamicModule {
    return {
      module: KeycloakModule,
      imports: [
        KeycloakConnectModule.register(options),
      ],
    };
  }
}
