import type { ConfigSchema } from './core/config'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  const configService = app.get(ConfigService<ConfigSchema, true>)

  await app.listen(configService.get<number>('PORT'))
}

void bootstrap()
