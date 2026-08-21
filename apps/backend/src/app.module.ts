import { Module } from '@nestjs/common'
import { AuthModule } from './auth'
import { CoreModule } from './core'
import { SharedModule } from './shared'
import { UserModule } from './user'

@Module({
  imports: [
    CoreModule,
    SharedModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
