import type { CookieOptions, Request, Response } from 'express'
import { ConfigO } from '@app/core/config'
import { UserService } from '@app/user'
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import ms, { StringValue } from 'ms'
import { RegisterO } from 'schemas'

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
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV', { infer: true }) === 'production',
      sameSite: 'lax',
    }

    const accessToken = this.jwtService.sign(req.user)
    res.cookie('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: ms(this.configService.get<StringValue>('JWT_ACCESS_TOKEN_EXPIRES_IN')),
    })
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
