import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class LocationsService {

  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // CREATE LOCATION
  //////////////////////////////////////////////////////

  async create(data: {
    name: string
    address?: string
    city?: string
  }) {
    return this.prisma.location.create({
      data
    })
  }

  //////////////////////////////////////////////////////
  // GET ALL LOCATIONS
  //////////////////////////////////////////////////////

  async findAll() {
    return this.prisma.location.findMany({
      orderBy: {
        id: 'desc'
      }
    })
  }

  //////////////////////////////////////////////////////
  // GET LOCATION BY ID
  //////////////////////////////////////////////////////

  async findOne(id: number) {
    return this.prisma.location.findUnique({
      where: { id },
      include: {
        programs: true
      }
    })
  }

  //////////////////////////////////////////////////////
  // UPDATE LOCATION
  //////////////////////////////////////////////////////

  async update(
    id: number,
    data: {
      name?: string
      address?: string
      city?: string
    }
  ) {
    return this.prisma.location.update({
      where: { id },
      data
    })
  }

  //////////////////////////////////////////////////////
  // DELETE LOCATION
  //////////////////////////////////////////////////////

  async remove(id: number) {
    return this.prisma.location.delete({
      where: { id }
    })
  }

  //////////////////////////////////////////////////////
  // GET PROGRAMS BY LOCATION
  //////////////////////////////////////////////////////

  async getPrograms(id: number) {
    return this.prisma.program.findMany({
      where: {
        locationId: id
      },
      include: {
        director: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

}