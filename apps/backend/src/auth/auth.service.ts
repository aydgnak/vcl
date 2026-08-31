import type { CookieOptions, Request, Response } from 'express'
import { ConfigO } from '@app/core/config'
import { UserService } from '@app/user'
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import ms, { StringValue } from 'ms'
import { RegisterO } from 'schemas'
import { JwtPayload } from './types'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<ConfigO, true>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

    return user
  }

  async validateJwtAuth(userUUID: string) {
    const user = await this.userService.findOne(userUUID)

    if (!user) {
      throw new UnauthorizedException()
    }
  }

  async login(req: Request, res: Response) {
    this.setAuthCookies(req.user, res)
  }

  async refresh(req: Request, res: Response) {
    this.setAccessTokenCookie(req.user, res)
  }

  private setAuthCookies(payload: JwtPayload, res: Response) {
    this.setAccessTokenCookie(payload, res)

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET', { infer: true }),
      expiresIn: this.configService.get<StringValue>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    })

    res.cookie('refreshToken', refreshToken, {
      ...this.getCookieOptions(),
      maxAge: ms(this.configService.get<StringValue>('JWT_REFRESH_TOKEN_EXPIRES_IN')),
      path: '/auth/refresh',
    })
  }

  private setAccessTokenCookie(payload: JwtPayload, res: Response) {
    const accessToken = this.jwtService.sign(payload)

    res.cookie('accessToken', accessToken, {
      ...this.getCookieOptions(),
      maxAge: ms(this.configService.get<StringValue>('JWT_ACCESS_TOKEN_EXPIRES_IN')),
    })
  }

  private getCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV', { infer: true }) === 'production',
      sameSite: 'lax',
    }
  }

  async register(register: RegisterO) {
    const { email, password } = register

    const user = await this.userService.findByEmail(email)
    if (user) {
      throw new ConflictException('The user already exists.')
    }

    return this.userService.create(email, password)
  }
}
