import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesController } from './courses/courses.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy'; // Bunu birazdan oluşturacağız

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'cok-gizli-anahtar', // Basit olması için hardcode yaptık
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AppController, CoursesController], // Controller buraya eklendi
    providers: [AppService, AuthService, PrismaService, JwtStrategy], // Servisler buraya eklendi
})
export class AppModule {}
