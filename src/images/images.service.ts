import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ImagesService {

  constructor(private prisma: PrismaService) {}

  /* ======================
     ADD SINGLE IMAGE
  ====================== */

  async addImage(programId: number, url: string) {

    return this.prisma.image.create({
      data: {
        url,
        programId
      }
    })

  }

  /* ======================
     ADD MULTIPLE IMAGES
  ====================== */

  async addImages(programId: number, urls: string[]) {

    return this.prisma.image.createMany({
      data: urls.map(url => ({
        url,
        programId
      }))
    })

  }

  /* ======================
     GET PROGRAM IMAGES
  ====================== */

  async findByProgram(programId: number) {

    return this.prisma.image.findMany({
      where: {
        programId
      },
      orderBy: {
        id: 'desc'
      }
    })

  }

  /* ======================
     DELETE IMAGE
  ====================== */

  async remove(id: number) {

    return this.prisma.image.delete({
      where: {
        id
      }
    })

  }

}