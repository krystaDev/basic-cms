import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './features/database/database.module';
import { TranslationModule } from './features/translation/translation.module';
import { TranslationsCatalogModule } from './features/translations-catalog/translations-catalog.module';
import { ApplicationModule } from './features/application/application.module';
import * as Joi from '@hapi/joi';
import { KeycloakConfigModule } from './features/keycloak-config/keycloak-config.module';
import {AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard} from "nest-keycloak-connect";
import {KeycloakConfigService} from "./features/keycloak-config/keycloak-config.service";
import {APP_GUARD} from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        KEYCLOAK_SERVER: Joi.string().required(),
        KEYCLOAK_REALM: Joi.string().required(),
        KEYCLOAK_CLIENT_ID: Joi.string().required(),
        KEYCLOAK_SECRET: Joi.string().required(),
      }),
    }),
    ConfigModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigModule, KeycloakConfigModule],
      inject: [ConfigService],
    }),
    DatabaseModule,
    TranslationModule,
    TranslationsCatalogModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, KeycloakConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }],
  exports: [KeycloakConfigService],
})
export class AppModule {}
