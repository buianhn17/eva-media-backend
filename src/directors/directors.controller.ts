import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param
  } from '@nestjs/common'
  
  import { DirectorsService } from './directors.service'
  
  @Controller('directors')
  export class DirectorsController {
  
    constructor(private readonly directorsService: DirectorsService) {}
  
    //////////////////////////////////////////////////////
    // CREATE
    //////////////////////////////////////////////////////
  
    @Post()
    create(@Body() body: any) {
      return this.directorsService.create(body)
    }
  
    //////////////////////////////////////////////////////
    // GET ALL
    //////////////////////////////////////////////////////
  
    @Get()
    getDirectors() {
      return this.directorsService.findAll()
    }
  
    //////////////////////////////////////////////////////
    // GET ONE
    //////////////////////////////////////////////////////
  
    @Get(':id')
    getDirector(@Param('id') id: string) {
      return this.directorsService.findOne(Number(id))
    }
  
    //////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////
  
    @Put(':id')
    updateDirector(
      @Param('id') id: string,
      @Body() body: any
    ) {
      return this.directorsService.update(Number(id), body)
    }
  
    //////////////////////////////////////////////////////
    // DELETE
    //////////////////////////////////////////////////////
  
    @Delete(':id')
    deleteDirector(@Param('id') id: string) {
      return this.directorsService.remove(Number(id))
    }
  
    //////////////////////////////////////////////////////
    // GET PROGRAMS BY DIRECTOR
    //////////////////////////////////////////////////////
  
    @Get(':id/programs')
    getPrograms(@Param('id') id: string) {
      return this.directorsService.getPrograms(Number(id))
    }
  
  }