import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiBody } from '@nestjs/swagger'
import { UploadService } from './upload.service'

@Controller('upload')
export class UploadController {

  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImage(file)
  }

}