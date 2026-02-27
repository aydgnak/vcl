import type { Request } from 'express'
import { ConfigSchema } from '@app/core/config'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PayloadType } from '../types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService<ConfigSchema, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => JwtStrategy.fromCookie(req),
      ]),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    })
  }

  private static fromCookie(req: Request) {
    return req.cookies.accessToken ?? null
  }

  async validate(payload: PayloadType) {
    return payload
  }
}
