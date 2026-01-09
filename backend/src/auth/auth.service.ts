import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async register(dto: any) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                role: dto.role || 'STUDENT'
            },
        });
    }

    async login(dto: any) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException();
        }
        return {
            access_token: this.jwtService.sign({ sub: user.id, role: user.role }),
            role: user.role
        };
    }

    async getProfile(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) return null;

        const { password, ...result } = user;
        return result;
    }
}