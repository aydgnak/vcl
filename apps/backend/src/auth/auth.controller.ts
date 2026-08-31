import type { Request, Response } from 'express'
import type { RegisterO } from 'schemas'
import { ValibotPipe } from '@app/common/pipes'
import { Body, Controller, Post, Req, Res, SerializeOptions, UseGuards } from '@nestjs/common'
import { minutes, Throttle } from '@nestjs/throttler'
import { registerSchema } from 'schemas'
import { AuthService } from './auth.service'
import { Public } from './decorators'
import { RegisterDto } from './dto'
import { JwtRefreshGuard, LocalGuard } from './guards'

@Public()
@SerializeOptions({ type: RegisterDto })
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Throttle({ default: { ttl: minutes(1), limit: 5 } })
  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(req, res)
  }

  @Post('refresh')
  @Throttle({ default: { ttl: minutes(1), limit: 5 } })
  @UseGuards(JwtRefreshGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.refresh(req, res)
  }

  @Throttle({ default: { ttl: minutes(5), limit: 5 } })
  @Post('register')
  async register(
    @Body(new ValibotPipe(registerSchema)) register: RegisterO,
  ) {
    return this.authService.register(register)
  }
}
