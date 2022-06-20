import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ApplicationEntity} from "./application.entity";
import {Repository} from "typeorm";
import {CreateApplicationDto} from "./dto/create-application.dto";
import {EditApplicationDto} from "./dto/edit-application.dto";

@Injectable()
export class ApplicationService {
  constructor(@InjectRepository(ApplicationEntity)
              private applicationRepository: Repository<ApplicationEntity>) {
  }

  createApplication(dto: CreateApplicationDto) {
    const entity = new ApplicationEntity();
    entity.name = dto.name;
    entity.translationsCatalog = null;
    return this.applicationRepository.save(this.applicationRepository.create(entity));
  }

  async updateApplication(id: string, dto: EditApplicationDto) {
    const entity = await this.findOne(id);
    entity.name = dto.name;
    return this.applicationRepository.save(entity);
  }

  private findOne(id: string): Promise<ApplicationEntity> {
    return this.applicationRepository.findOne({
      where: {
        uuid: id
      },
    });
  }

}
