import {ApiProperty} from "@nestjs/swagger";

export class CreateApplicationDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 100
  })
  name: string;
}
