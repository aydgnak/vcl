import type { NestExpressApplication } from '@nestjs/platform-express'
import type { ConfigSchema } from './core/config'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import '@valibot/i18n/tr'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(cookieParser())

  const configService = app.get(ConfigService<ConfigSchema, true>)

  app.enableCors({
    origin: configService.get<string>('CLIENT_URL'),
    credentials: true,
  })

  await app.listen(configService.get<number>('PORT'))
}

void bootstrap()
