import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class DirectorsService {

  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // CREATE DIRECTOR
  //////////////////////////////////////////////////////

  async create(data: {
    name: string
    slug: string
    avatar?: string
    bio?: string
  }) {
    return this.prisma.director.create({
      data
    })
  }

  //////////////////////////////////////////////////////
  // GET ALL DIRECTORS
  //////////////////////////////////////////////////////

  async findAll() {
    return this.prisma.director.findMany({
      orderBy: {
        id: 'desc'
      }
    })
  }

  //////////////////////////////////////////////////////
  // GET DIRECTOR BY ID
  //////////////////////////////////////////////////////

  async findOne(id: number) {
    return this.prisma.director.findUnique({
      where: { id },
      include: {
        programs: true
      }
    })
  }

  //////////////////////////////////////////////////////
  // UPDATE DIRECTOR
  //////////////////////////////////////////////////////

  async update(
    id: number,
    data: {
      name?: string
      slug?: string
      avatar?: string
      bio?: string
    }
  ) {
    return this.prisma.director.update({
      where: { id },
      data
    })
  }

  //////////////////////////////////////////////////////
  // DELETE DIRECTOR
  //////////////////////////////////////////////////////

  async remove(id: number) {
    return this.prisma.director.delete({
      where: { id }
    })
  }

  //////////////////////////////////////////////////////
  // GET PROGRAMS BY DIRECTOR
  //////////////////////////////////////////////////////

  async getPrograms(id: number) {
    return this.prisma.program.findMany({
      where: {
        directorId: id
      },
      include: {
        location: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

}