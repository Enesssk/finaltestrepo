import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('courses')
export class CoursesController {
    constructor(private prisma: PrismaService) {}

    @Get()
    getAll() {
        return this.prisma.course.findMany({ include: { categories: true, lessons: true } });
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() data: any) {
        // Frontend'den gelen kategori ID'lerini bağlama (N:N yönetimi) [cite: 10]
        return this.prisma.course.create({
            data: {
                title: data.title,
                description: data.description,
                instructorId: data.userId,
                categories: {
                    connect: data.categoryIds.map((id: number) => ({ id }))
                }
            },
        });
    }
}