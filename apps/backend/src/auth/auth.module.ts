import { ConfigO } from '@app/core/config'
import { UserModule } from '@app/user'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { StringValue } from 'ms'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtGuard } from './guards'
import { JwtStrategy, LocalStrategy } from './strategies'

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigO, true>) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET', { infer: true }),
        signOptions: {
          expiresIn: configService.get<StringValue>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AuthModule {}
