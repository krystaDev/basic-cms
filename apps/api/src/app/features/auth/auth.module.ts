import { Module } from '@nestjs/common';
import {KeycloakConnectModule} from "nest-keycloak-connect";
import {KeycloakConfigService} from "./keycloak-config.service";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigModule],
      inject: [ConfigService],
    })
  ]
})
export class AuthModule {}
