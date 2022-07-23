import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ApplicationEntity} from "./application.entity";
import {Repository} from "typeorm";
import {CreateApplicationDto} from "./dto/create-application.dto";
import {EditApplicationDto} from "./dto/edit-application.dto";
import {TranslationsCatalogEntity} from "../translations-catalog/translations-catalog.entity";

@Injectable()
export class ApplicationService {
  constructor(@InjectRepository(ApplicationEntity)
              private applicationRepository: Repository<ApplicationEntity>,
              @InjectRepository(TranslationsCatalogEntity)
              private translationCatalogRepository: Repository<TranslationsCatalogEntity>) {
  }

  async createApplication(dto: CreateApplicationDto) {
    const applicationEntity = new ApplicationEntity();
    const translationCatalogEntity = new TranslationsCatalogEntity();
    translationCatalogEntity.name = dto.name;
    translationCatalogEntity.translations = [];
    const translationRecord = await this.translationCatalogRepository.save(translationCatalogEntity);

    //check that application name was not used
    const exist = await this.applicationRepository.findOneBy({
      name: dto.name
    })

    if (exist) {
      console.log(exist)
      throw new BadRequestException({message: `Application name '${dto.name}' already exist`});
    }

    applicationEntity.name = dto.name;
    applicationEntity.translationsCatalog = translationRecord
    return this.applicationRepository.save(this.applicationRepository.create(applicationEntity));
  }

  async updateApplication(id: string, dto: EditApplicationDto) {
    const entity = await this.findOne(id);
    entity.name = dto.name;
    return this.applicationRepository.save(entity);
  }

  private findOne(id: string): Promise<ApplicationEntity> {
    return this.applicationRepository.findOneBy({
        uuid: id
    });
  }

  getAllApplications() {
    return this.applicationRepository.find();
  }
}
