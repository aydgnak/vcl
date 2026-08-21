import { UserModule } from '@app/user'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies'

@Module({
  imports: [
    UserModule,
    PassportModule,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    LocalStrategy,
  ],
})
export class AuthModule {}
