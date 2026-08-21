import { Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalGuard } from './guards'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login() {}
}
