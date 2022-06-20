import {ApiProperty} from "@nestjs/swagger";

export class EditApplicationDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 100
  })
  name: string;

  @ApiProperty()
  translations: string[]
}
