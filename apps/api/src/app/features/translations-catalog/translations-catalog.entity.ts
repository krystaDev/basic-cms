import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {TranslationEntity} from "../translation/translation.entity";

@Entity()
export class TranslationsCatalogEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  name: string;

  @OneToOne(() => TranslationsCatalogEntity, {
    nullable: true
  })
  parent?: TranslationsCatalogEntity

  @OneToMany(() => TranslationsCatalogEntity, (t) => t.parent)
  children?: TranslationsCatalogEntity[]

  @OneToMany(() => TranslationEntity, (t) => t.parent)
  translations: TranslationEntity[]
}
