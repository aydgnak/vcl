import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { minutes, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { loads, validate } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      load: loads,
      cache: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        { ttl: minutes(1), limit: 100 },
      ],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class CoreModule {}
