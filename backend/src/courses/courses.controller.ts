import { Controller, Get, Post, Put, Delete, Body, UseGuards, Request, Param } from '@nestjs/common'; // Put ve Param eklendi
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('courses')
export class CoursesController {
    constructor(private prisma: PrismaService) {}

    @Get()
    getAll() {
        return this.prisma.course.findMany({ include: { categories: true } });
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.prisma.course.findUnique({
            where: { id: Number(id) },
            include: { categories: true }
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() data: any, @Request() req) {
        const userId = req.user.userId;
        return this.prisma.course.create({
            data: {
                title: data.title,
                description: data.description,
                instructorId: userId,
                categories: {
                    create: [{ name: data.category }]
                }
            },
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any) {
        return this.prisma.course.update({
            where: { id: Number(id) },
            data: {
                title: data.title,
                description: data.description,
            }
        });
    }


}