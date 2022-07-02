import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TranslationEntity} from "./translation.entity";
import {TranslationsCatalogEntity} from "../translations-catalog/translations-catalog.entity";
import {CreateTranslationDto} from "./dto/create-translation.dto";

@Injectable()
export class TranslationService {
  @InjectRepository(TranslationEntity)
  private translationRepository: Repository<TranslationEntity>;
  @InjectRepository(TranslationsCatalogEntity)
  private translationCatalogRepository: Repository<TranslationsCatalogEntity>
  async getAllTranslationByCatalogId(id: string) {
    return await this.translationRepository.find({
      where: {
        parent: {
          uuid: id
        }
      }
    })
  }

  async createNewTranslation(parentId: string, model: CreateTranslationDto) {
    const entity = new TranslationEntity();
    entity.parent = await this.translationCatalogRepository.findOne({where: {
      uuid: parentId
      }})
    entity.content = model.content;
    entity.locale = model.locale;

    return this.translationRepository.save(entity);
  }

  async getOneTranslation(id: string) {
    return await this.translationRepository.findOneBy({
      uuid: id
    });
  }
}
