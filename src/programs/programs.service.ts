import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class ProgramsService {

  constructor(private prisma: PrismaService) {}

  /* =========================
     GET ALL PROGRAMS
  ========================== */

  async findAll(params: { page?: number; search?: string; director?: number; location?: number }) {
    const page = params.page || 1;
    const take = 10;
    const skip = (page - 1) * take;
  
    const where = {
      title: params.search ? { contains: params.search, mode: 'insensitive' as const } : undefined,
      directorId: params.director,
      locationId: params.location,
    };
  
    const [data, total] = await Promise.all([
      this.prisma.program.findMany({
        skip, take, where,
        include: { director: true, location: true, images: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.program.count({ where }),
    ]);
  
    return { data, total, page, limit: take };
  }

  /* =========================
     GET PROGRAM BY SLUG
  ========================== */

  async findOne(slug: string) {
    return this.prisma.program.findUnique({
      where: { slug },
      include: {
        director: true,
        location: true,
        images: true
      }
    });
  }

  /* =========================
     CREATE PROGRAM
  ========================== */

  async create(data: any) {

    // Generate slug from title
    let slug = slugify(data.title, {
      lower: true,
      strict: true
    });

    // Check if slug already exists
    const existing = await this.prisma.program.findUnique({
      where: { slug }
    });

    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    return this.prisma.program.create({
      data: {
        ...data,
        slug
      }
    });

  }

  /* =========================
     UPDATE PROGRAM
  ========================== */

  async update(id: number, data: any) {

    // Nếu title thay đổi → cập nhật slug
    if (data.title) {

      let slug = slugify(data.title, {
        lower: true,
        strict: true
      });

      const existing = await this.prisma.program.findUnique({
        where: { slug }
      });

      if (existing && existing.id !== id) {
        slug = `${slug}-${Date.now()}`;
      }

      data.slug = slug;
    }

    return this.prisma.program.update({
      where: { id },
      data
    });

  }

  /* =========================
     DELETE PROGRAM
  ========================== */

  async remove(id: number) {
    return this.prisma.program.delete({
      where: { id }
    });
  }

}