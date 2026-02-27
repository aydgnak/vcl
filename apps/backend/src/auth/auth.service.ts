import { ConfigSchema } from '@app/core/config'
import { UserService } from '@app/user'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import ms, { StringValue } from 'ms'

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

    const accessToken = this.jwtService.sign(payload)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: ms(this.configService.get<StringValue>('JWT_ACCESS_EXPIRES_IN')),
    })

    return {
      accessToken,
    }
  }

  async logout(res: Response) {
    res.clearCookie('accessToken')
  }
}
