import type { NestExpressApplication } from '@nestjs/platform-express'
import type { ConfigO } from './core/config'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(cookieParser())

  app.set('trust proxy', 'loopback')

  const configService = app.get(ConfigService<ConfigO, true>)

  const port = configService.get('PORT', { infer: true })

  await app.listen(port, () => {
    Logger.log(`Application is running on port ${port}`, 'Bootstrap')
  })
}

void bootstrap()
