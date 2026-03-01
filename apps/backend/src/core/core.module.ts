import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CookieResolver, I18nModule } from 'nestjs-i18n'
import { configLoads, configValidate } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configLoads,
      validate: configValidate,
      cache: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, 'i18n'),
        watch: true,
      },
      typesOutputPath: join(__dirname, '../../i18n.d.ts'),
      resolvers: [
        new CookieResolver(['locale']),
      ],
    }),
  ],
})
export class CoreModule {}
