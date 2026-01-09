import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesController } from './courses/courses.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'cok-gizli-anahtar',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AppController, CoursesController, AuthController],
    providers: [AppService, AuthService, PrismaService, JwtStrategy],
})
export class AppModule {}