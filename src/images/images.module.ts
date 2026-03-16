import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service'; // ← thêm

@Module({
  controllers: [ImagesController],
  providers: [
    ImagesService,
    PrismaService,
    UploadService, 
  ],
})
export class ImagesModule {}