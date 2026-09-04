import { Buffer } from 'node:buffer'
import { ConfigO } from '@app/core/config'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { JwtPayload } from '../types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly configService: ConfigService<ConfigO, true>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => JwtStrategy.fromCookie(req),
      ]),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKey: Buffer
        .from(configService.get('JWT_ACCESS_TOKEN_PUBLIC_KEY', { infer: true }), 'base64')
        .toString('utf8'),
    })
  }

  private static fromCookie(req: Request): string | null {
    return req.cookies.accessToken ?? null
  }

  async validate(payload: JwtPayload) {
    await this.authService.validateJwtAuth(payload.sub)

    return {
      sub: payload.sub,
    } satisfies JwtPayload
  }
}
