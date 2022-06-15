import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './features/database/database.module';
import { TranslationModule } from './features/translation/translation.module';
import { TranslationsCatalogModule } from './features/translations-catalog/translations-catalog.module';
import { ApplicationModule } from './features/application/application.module';
import * as Joi from '@hapi/joi';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ApplicationEntity} from "./features/application/application.entity";
import {TranslationsCatalogEntity} from "./features/translations-catalog/translations-catalog.entity";
import {TranslationEntity} from "./features/translation/translation.entity";

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
      }),
    }),
    DatabaseModule,
    TranslationModule,
    TranslationsCatalogModule,
    ApplicationModule,
    ConfigModule,
    TypeOrmModule.forFeature([TranslationEntity, TranslationsCatalogEntity,ApplicationEntity])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
