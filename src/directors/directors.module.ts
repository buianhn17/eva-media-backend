import { Module } from '@nestjs/common'
import { DirectorsController } from './directors.controller'
import { DirectorsService } from './directors.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [DirectorsController],
  providers: [DirectorsService],
})
export class DirectorsModule {}