import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

  constructor(protected configService: ConfigService) {}
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.configService.get('KEYCLOAK_SERVER'),
      realm: this.configService.get('KEYCLOAK_'),
      clientId: this.configService.get('KEYCLOAK_CLIENT_ID'),
      secret: this.configService.get('KEYCLOAK_SECRET'),
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
