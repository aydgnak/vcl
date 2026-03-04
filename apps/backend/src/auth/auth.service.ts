import { ConfigSchema } from '@app/core/config'
import { AuthProvider } from '@app/generated/prisma/client'
import { UserService } from '@app/user'
import { I18nTranslations } from '@i18n'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import ms, { StringValue } from 'ms'
import { I18nService } from 'nestjs-i18n'
import { PayloadType } from './types'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<ConfigSchema, true>,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async validateUserWithLocal(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    if (!user || user.password === null) {
      return null
    }

    const isPasswordMatch = await compare(password, user.password)

    if (!isPasswordMatch) {
      throw new UnauthorizedException(this.i18n.t('auth.unauthorized'))
    }

    const { password: userPassword, ...result } = user

    return result
  }

  async validateUserWithOAuth(provider: AuthProvider, providerId: string, email: string) {
    const user = await this.userService.findOrCreateByOAuth({ provider, providerId, email })

    return {
      uuid: user.uuid,
      email: user.email,
    } satisfies PayloadType
  }

  async login(req: Request, res: Response) {
    const payload = this.toPayload(req.user)

    const accessToken = this.generateAccessToken(payload, res)
    const refreshToken = this.generateRefreshToken(payload, res)

    return {
      accessToken,
      refreshToken,
      user: payload,
    }
  }

  async refresh(req: Request, res: Response) {
    const payload = this.toPayload(req.user)

    const accessToken = this.generateAccessToken(payload, res)

    return {
      accessToken,
      user: payload,
    }
  }

  private toPayload(user: Request['user']): PayloadType {
    const payload = user

    return {
      uuid: payload.uuid,
      email: payload.email,
    }
  }

  private generateAccessToken(payload: PayloadType, res: Response) {
    const accessToken = this.jwtService.sign(payload)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: ms(this.configService.get<StringValue>('JWT_ACCESS_EXPIRES_IN')),
    })

    return accessToken
  }

  private generateRefreshToken(payload: PayloadType, res: Response) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<StringValue>('JWT_REFRESH_EXPIRES_IN'),
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: ms(this.configService.get<StringValue>('JWT_REFRESH_EXPIRES_IN')),
    })

    return refreshToken
  }

  async logout(res: Response) {
    const cookieOptions = {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax' as const,
    }

    res.clearCookie('accessToken', cookieOptions)
    res.clearCookie('refreshToken', cookieOptions)
  }
}
