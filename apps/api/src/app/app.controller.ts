import { Controller, Get } from '@nestjs/common';

import {InjectRepository} from "@nestjs/typeorm";
import {ApplicationEntity} from "./features/application/application.entity";
import {Repository} from "typeorm";

@Controller()
export class AppController {
  constructor(@InjectRepository(ApplicationEntity)
              private applicationRepository: Repository<ApplicationEntity>) {}

  @Get('init')
  init() {
    const entity = new ApplicationEntity();
    entity.name = 'test2';
    entity.translationsCatalog = null;
    const record = this.applicationRepository.create(entity)
    return this.applicationRepository.save(record);
  }
}
