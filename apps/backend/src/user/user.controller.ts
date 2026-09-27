import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('me')
  @HttpCode(HttpStatus.OK)
  async me() {
    return this.userService.me()
  }
}
