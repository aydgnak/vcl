import { ConfigSchema } from '@app/core/config'
import { UserService } from '@app/user'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import ms, { StringValue } from 'ms'
import { PayloadType } from './types'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<ConfigSchema, true>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserWithLocal(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    if (!user || user.password === null) {
      return null
    }

    const isPasswordMatch = await compare(password, user.password)

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Username or password is incorrect')
    }

    const { password: userPassword, ...result } = user

    return result
  }

  async login(req: Request, res: Response) {
    const payload = req.user

    const accessToken = this.generateAccessToken(payload, res)
    const refreshToken = this.generateRefreshToken(payload, res)

    return {
      accessToken,
      refreshToken,
    }
  }

  async refresh(req: Request, res: Response) {
    const payload = req.user

    const accessToken = this.generateAccessToken(payload, res)

    return {
      accessToken,
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
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
  }
}
