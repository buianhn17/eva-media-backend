import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { ProgramsModule } from './programs/programs.module';
import { DirectorsModule } from './directors/directors.module';
import { LocationsModule } from './locations/locations.module';
import { UploadModule } from './upload/upload.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    ProgramsModule,
    DirectorsModule,
    LocationsModule,
    UploadModule,
    ImagesModule,
    AuthModule
  ],
})
export class AppModule {}