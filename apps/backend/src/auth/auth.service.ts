import { UserService } from '@app/user'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async validateLocalAuth(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    if (!user || user.password === null) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isMatch = await compare(password, user.password)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const { password: _password, ...safeUser } = user

    return safeUser
  }
}
