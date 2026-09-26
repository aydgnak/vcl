import { UserModule } from '@app/user'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtGuard } from './guards'
import { JwtRefreshStrategy, JwtStrategy, LocalStrategy } from './strategies'

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule.register({}),
    JwtModule.register({}),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtGuard,
  ],
  exports: [
    JwtGuard,
  ],
})
export class AuthModule {}
