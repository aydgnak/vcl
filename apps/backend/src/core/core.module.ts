import { join } from 'node:path'
import { I18nTranslations } from '@app/generated/i18n.generated'
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis'
import { ClassSerializerInterceptor, ExecutionContext, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { minutes, seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { ClsModule } from 'nestjs-cls'
import { CookieResolver, I18nContext, I18nModule } from 'nestjs-i18n'
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
        errorMessage: (context: ExecutionContext) => {
          const i18nContext = I18nContext.current<I18nTranslations>(context)

          return i18nContext?.t('http.tooManyRequests') ?? 'Too many requests'
        },
        storage: new ThrottlerStorageRedisService(configService.get('REDIS_URL', { infer: true }), {
          connectTimeout: seconds(5),
          maxRetriesPerRequest: 1,
        }),
      }),
    }),
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigO, true>) => {
        const isDevelopment = configService.get('NODE_ENV', { infer: true }) === 'development'

        return {
          fallbackLanguage: 'en',
          loaderOptions: {
            path: join(__dirname, 'i18n/'),
            watch: isDevelopment,
          },
          ...(isDevelopment && {
            typesOutputPath: join(__dirname, '../../src/generated/i18n.generated.ts'),
          }),
        }
      },
      resolvers: [
        { use: CookieResolver, options: ['lang'] },
      ],
    }),
    ClsModule.forRoot({
      middleware: {
        mount: true,
      },
    }),
  ],
  providers: [
    ThrottlerGuard,
    ClassSerializerInterceptor,
  ],
  exports: [
    ThrottlerGuard,
    ClassSerializerInterceptor,
  ],
})
export class CoreModule {}
