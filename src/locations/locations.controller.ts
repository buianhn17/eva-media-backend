import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param
  } from '@nestjs/common'
  
  import { LocationsService } from './locations.service'
  
  @Controller('locations')
  export class LocationsController {
  
    constructor(private readonly locationsService: LocationsService) {}
  
    //////////////////////////////////////////////////////
    // CREATE
    //////////////////////////////////////////////////////
  
    @Post()
    create(@Body() body: any) {
      return this.locationsService.create(body)
    }
  
    //////////////////////////////////////////////////////
    // GET ALL
    //////////////////////////////////////////////////////
  
    @Get()
    getLocations() {
      return this.locationsService.findAll()
    }
  
    //////////////////////////////////////////////////////
    // GET ONE
    //////////////////////////////////////////////////////
  
    @Get(':id')
    getLocation(@Param('id') id: string) {
      return this.locationsService.findOne(Number(id))
    }
  
    //////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////
  
    @Put(':id')
    updateLocation(
      @Param('id') id: string,
      @Body() body: any
    ) {
      return this.locationsService.update(Number(id), body)
    }
  
    //////////////////////////////////////////////////////
    // DELETE
    //////////////////////////////////////////////////////
  
    @Delete(':id')
    deleteLocation(@Param('id') id: string) {
      return this.locationsService.remove(Number(id))
    }
  
    //////////////////////////////////////////////////////
    // PROGRAMS BY LOCATION
    //////////////////////////////////////////////////////
  
    @Get(':id/programs')
    getPrograms(@Param('id') id: string) {
      return this.locationsService.getPrograms(Number(id))
    }
  
  }