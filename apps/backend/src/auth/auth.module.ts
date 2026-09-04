import { Buffer } from 'node:buffer'
import { createPrivateKey, createPublicKey } from 'node:crypto'
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
import { JwtRefreshStrategy, JwtStrategy, LocalStrategy } from './strategies'

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigO, true>) => ({
        privateKey: createPrivateKey(Buffer.from(configService.get('JWT_ACCESS_TOKEN_PRIVATE_KEY', { infer: true }), 'base64')),
        publicKey: createPublicKey(Buffer.from(configService.get('JWT_ACCESS_TOKEN_PUBLIC_KEY', { infer: true }), 'base64')),
        signOptions: {
          algorithm: 'RS256',
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
    JwtRefreshStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AuthModule {}
