import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { loads, validate } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      load: loads,
      cache: true,
    }),
  ],
})
export class CoreModule {}
