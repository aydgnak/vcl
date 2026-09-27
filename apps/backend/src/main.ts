import type { NestExpressApplication } from '@nestjs/platform-express'
import type { ConfigO } from './core/config'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get(ConfigService<ConfigO, true>)

  const clientOrigin = new URL(
    configService.get('CLIENT_ORIGIN', { infer: true }),
  ).origin

  const port = configService.get('PORT', { infer: true })

  app.use(cookieParser())

  app.set('trust proxy', 'loopback')

  app.enableShutdownHooks()

  app.enableCors({
    origin: clientOrigin,
    credentials: true,
  })

  app.enableCsrfProtection({
    trustedOrigins: [
      clientOrigin,
    ],
  })

  await app.listen(port, () => {
    Logger.log(`Application is running on port ${port}`, 'Bootstrap')
  })
}

void bootstrap()
