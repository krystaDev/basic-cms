import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApplicationService} from "./application.service";
import {CreateApplicationDto} from "./dto/create-application.dto";
import {EditApplicationDto} from "./dto/edit-application.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AuthGuard, Public, Roles} from 'nest-keycloak-connect';

@Controller('application')
@ApiTags('Application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {
  }

  @Get('/')
  @ApiBearerAuth('JWT')
  @Roles({ roles: ['user'] })
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
