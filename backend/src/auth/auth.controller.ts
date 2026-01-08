import {Controller, Post, Body, UseGuards, Get, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: any) {
        return this.authService.login(body);
    }

    @Post('register')
    async register(@Body() body: any) {
        return this.authService.register(body);
    }

    // --- YENİ: Profil Endpoint'i ---
    @UseGuards(AuthGuard('jwt')) // Sadece giriş yapmışlar görebilir
    @Get('profile')
    async getProfile(@Request() req) {
        // Token'dan gelen userId ile veritabanından bilgileri çek
        return this.authService.getProfile(req.user.userId);
    }
}