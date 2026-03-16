import {
    Controller, Post, Get, Delete,
    Param, Body, UploadedFiles, UseInterceptors
  } from '@nestjs/common'
  import { FilesInterceptor } from '@nestjs/platform-express'
  import { ImagesService } from './images.service'
  import { UploadService } from '../upload/upload.service'
  
  @Controller('images')
  export class ImagesController {
  
    constructor(
      private readonly imagesService: ImagesService,
      private readonly uploadService: UploadService, // ← inject UploadService
    ) {}
  
    @Post('program/:programId')
    addImage(
      @Param('programId') programId: string,
      @Body('url') url: string
    ) {
      return this.imagesService.addImage(Number(programId), url)
    }
  
    @Post('program/:programId/upload')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadImages(
      @Param('programId') programId: string,
      @UploadedFiles() files: Express.Multer.File[]
    ) {
      // Upload từng file lên Cloudinary
      const uploadResults = await Promise.all(
        files.map(file => this.uploadService.uploadImage(file))
      )
  
      const urls = uploadResults.map((r: any) => r.url)
  
      return this.imagesService.addImages(Number(programId), urls)
    }
  
    @Get('program/:programId')
    findImages(@Param('programId') programId: string) {
      return this.imagesService.findByProgram(Number(programId))
    }
  
    @Delete(':id')
    removeImage(@Param('id') id: string) {
      return this.imagesService.remove(Number(id))
    }
  }