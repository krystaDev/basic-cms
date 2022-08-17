import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TranslationEntity} from "../translation/translation.entity";
import {TranslationsCatalogEntity} from "../translations-catalog/translations-catalog.entity";
import {ApplicationEntity} from "./application.entity";
import { ApplicationService } from './application.service';

@Module({
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
  ],
  imports: [
    TypeOrmModule.forFeature([TranslationEntity, TranslationsCatalogEntity,ApplicationEntity])
  ]
})
export class ApplicationModule {}
