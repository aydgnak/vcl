import { Controller, HttpCode, HttpStatus, Post, SerializeOptions } from '@nestjs/common'
import { MeDto } from './dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('me')
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({ type: MeDto })
  async me() {
    return this.userService.me()
  }
}
