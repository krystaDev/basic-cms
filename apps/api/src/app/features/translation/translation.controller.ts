import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {TranslationService} from "./translation.service";
import {CreateTranslationDto} from "./dto/create-translation.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('translation')
@ApiTags('Translation')
export class TranslationController {
  constructor(private translationService: TranslationService) {
  }

  @Get('/get-all-for-parent/:uuid')
  async getAll(@Param('uuid') id: string) {
    return this.translationService.getAllTranslationByCatalogId(id);
  }

  @Post('/:parentId')
  async create(@Param('parentId') parentId: string, @Body() dto: CreateTranslationDto) {
    return this.translationService.createNewTranslation(parentId, dto);
  }

  @Get('/:translationId')
  async getOneTranslation(@Param('translationId') id: string) {
    return await this.translationService.getOneTranslation(id);
  }

}
