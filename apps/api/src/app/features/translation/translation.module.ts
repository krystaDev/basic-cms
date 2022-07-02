import { Module } from '@nestjs/common';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TranslationEntity} from "./translation.entity";
import {TranslationsCatalogEntity} from "../translations-catalog/translations-catalog.entity";

@Module({
  controllers: [TranslationController],
  providers: [TranslationService],
  imports: [
    TypeOrmModule.forFeature([TranslationsCatalogEntity, TranslationEntity])
  ]
})
export class TranslationModule {}
