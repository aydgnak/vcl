import type { Request, Response } from 'express'
import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { AuthService } from './auth.service'
import { Public } from './decorators'
import { LocalGuard } from './guards'

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(req, res)
  }
}
