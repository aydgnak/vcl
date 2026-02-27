import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { PayloadType } from '../types'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUserWithLocal(email, password)

    if (!user) {
      throw new UnauthorizedException()
    }

    return {
      uuid: user.uuid,
      email: user.email,
    } satisfies PayloadType
  }
}
