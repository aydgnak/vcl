import type { ConfigSchema } from '@app/core/config'
import type { Request, Response } from 'express'
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { Public } from './decorators'
import { GoogleAuthGuard, JwtRefreshAuthGuard, LocalAuthGuard } from './guards'

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<ConfigSchema, true>,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(req, res)
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res)
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(res)
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async google() {
    // Guard redirects to Google consent screen
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.authService.login(req, res)

    res.redirect(this.configService.get('CLIENT_URL'))
  }
}
