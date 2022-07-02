import {ApiProperty} from "@nestjs/swagger";

export class CreateTranslationDto {
  @ApiProperty()
  locale: string;

  @ApiProperty()
  content: string;
}
