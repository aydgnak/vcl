import { ConfigO } from '@app/core/config'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { JwtPayload } from '../types'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    readonly configService: ConfigService<ConfigO, true>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => JwtRefreshStrategy.fromCookie(req),
      ]),
      ignoreExpiration: false,
      algorithms: ['HS256'],
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET', { infer: true }),
    })
  }

  private static fromCookie(req: Request): string | null {
    return req.cookies.refreshToken ?? null
  }

  async validate(payload: JwtPayload) {
    await this.authService.validateJwtAuth(payload.sub)

    return {
      sub: payload.sub,
    } satisfies JwtPayload
  }
}
