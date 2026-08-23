import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis'
import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { minutes, seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { ConfigO, loads, validate } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      load: loads,
      cache: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigO, true>) => ({
        throttlers: [
          { ttl: minutes(1), limit: 100 },
        ],
        storage: new ThrottlerStorageRedisService(configService.get('REDIS_URL', { infer: true }), {
          connectTimeout: seconds(5),
          maxRetriesPerRequest: 1,
        }),
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class CoreModule {}
