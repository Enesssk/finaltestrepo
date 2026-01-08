import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('courses')
export class CoursesController {
    constructor(private prisma: PrismaService) {}

    @Get()
    getAll() {
        return this.prisma.course.findMany({ include: { categories: true } });
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() data: any, @Request() req) {
        // BURAYA LOG KOYUYORUZ: Backend'e istek geliyor mu görelim
        console.log("BACKEND'E İSTEK GELDİ!");
        console.log("Kullanıcı ID (Token'dan):", req.user.userId);
        console.log("Gelen Veri:", data);

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
}