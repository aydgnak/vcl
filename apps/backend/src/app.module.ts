import { Module } from '@nestjs/common'
import { AuthModule } from './auth'
import { CoreModule } from './core'
import { SharedModule } from './shared'

@Module({
  imports: [
    CoreModule,
    SharedModule,
    AuthModule,
  ],
})
export class AppModule {}
