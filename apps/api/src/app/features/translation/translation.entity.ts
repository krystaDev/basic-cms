import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TranslationsCatalogEntity} from "../translations-catalog/translations-catalog.entity";

@Entity()
export class TranslationEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({nullable: true})
  lang: string;

  @Column()
  locale: string;

  @Column({
    type: 'jsonb'
  })
  content: string;

  @ManyToOne(() => TranslationsCatalogEntity, (t) => t.translations)
  parent:TranslationsCatalogEntity
}
