import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApplicationService} from "./application.service";
import {CreateApplicationDto} from "./dto/create-application.dto";
import {EditApplicationDto} from "./dto/edit-application.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('application')
@ApiTags('Application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {
  }

  @Get('/')
  getAll() {
    return this.applicationService.getAllApplications();
  }

  @Post('/')
  async create(@Body() createAppDto: CreateApplicationDto) {
    return this.applicationService.createApplication(createAppDto);
  }

  @Post('/:uuid')
  async update(@Param('uuid') id: string, @Body() updateAppDto: EditApplicationDto) {
    return this.applicationService.updateApplication(id, updateAppDto);
  }
}
