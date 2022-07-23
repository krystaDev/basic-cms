import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './features/database/database.module';
import { TranslationModule } from './features/translation/translation.module';
import { TranslationsCatalogModule } from './features/translations-catalog/translations-catalog.module';
import { ApplicationModule } from './features/application/application.module';
import * as Joi from '@hapi/joi';
import {KeycloakConnectModule} from "nest-keycloak-connect";
import {KeycloakConfigService} from "./features/auth/keycloak-config.service";
import { AuthModule } from './features/auth/auth.module';

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
    DatabaseModule,
    TranslationModule,
    TranslationsCatalogModule,
    ApplicationModule,
    ConfigModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,

],
})
export class AppModule {}
