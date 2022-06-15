import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {TranslationsCatalogEntity} from "../translations-catalog/translations-catalog.entity";

@Entity()
export class ApplicationEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({unique: true})
  name: string;

  @OneToOne(() => TranslationsCatalogEntity)
  @JoinColumn()
  translationsCatalog: TranslationsCatalogEntity;
}
