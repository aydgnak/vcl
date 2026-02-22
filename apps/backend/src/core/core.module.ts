import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configLoads, configValidate } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configLoads,
      validate: configValidate,
      cache: true,
    }),
  ],
})
export class CoreModule {}
