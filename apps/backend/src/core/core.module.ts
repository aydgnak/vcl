import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configLoads, envValidate } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configLoads,
      validate: envValidate,
      cache: true,
    }),
  ],
})
export class CoreModule {}
