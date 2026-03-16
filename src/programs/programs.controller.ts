import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    Query,
    ParseIntPipe,
    UseGuards
  } from '@nestjs/common'
  
  import { ProgramsService } from './programs.service'
  import { CreateProgramDto } from './dto/create-program.dto'
  import { JwtAuthGuard } from '../auth/jwt.guard'
  
  @Controller('programs')
  export class ProgramsController {
  
    constructor(private readonly programsService: ProgramsService) {}
  
    /* =========================
       GET ALL PROGRAMS
    ========================== */
  
    @Get()
    getPrograms(
      @Query('page') page?: string,
      @Query('search') search?: string,
      @Query('director') director?: string,
      @Query('location') location?: string
    ) {
  
      return this.programsService.findAll({
        page: page ? Number(page) : 1,
        search,
        director: director ? Number(director) : undefined,
        location: location ? Number(location) : undefined
      })
  
    }
  
    /* =========================
       GET PROGRAM BY SLUG
    ========================== */
  
    @Get(':slug')
    getProgram(
      @Param('slug') slug: string
    ) {
  
      return this.programsService.findOne(slug)
  
    }
  
    /* =========================
       CREATE PROGRAM (Protected)
    ========================== */
  
    @UseGuards(JwtAuthGuard)
    @Post()
    createProgram(
      @Body() body: CreateProgramDto
    ) {
  
      return this.programsService.create(body)
  
    }
  
    /* =========================
       UPDATE PROGRAM (Protected)
    ========================== */
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateProgram(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: CreateProgramDto
    ) {
  
      return this.programsService.update(id, body)
  
    }
  
    /* =========================
       DELETE PROGRAM (Protected)
    ========================== */
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteProgram(
      @Param('id', ParseIntPipe) id: number
    ) {
  
      return this.programsService.remove(id)
  
    }
  
  }