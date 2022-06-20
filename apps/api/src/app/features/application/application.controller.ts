import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApplicationService} from "./application.service";
import {CreateApplicationDto} from "./dto/create-application.dto";
import {EditApplicationDto} from "./dto/edit-application.dto";

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {
  }

  @Post('/')
  create(@Body() createAppDto: CreateApplicationDto) {
    return this.applicationService.createApplication(createAppDto);
  }

  @Post('/:uuid')
  async update(@Param('uuid') id: string, @Body() updateAppDto: EditApplicationDto) {
    return this.applicationService.updateApplication(id, updateAppDto);
  }
}
