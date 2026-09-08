import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ThrottlerGuard } from '@nestjs/throttler'
import { AuthModule } from './auth'
import { JwtGuard } from './auth/guards'
import { CoreModule } from './core'
import { SharedModule } from './shared'
import { UserModule } from './user'

@Module({
  imports: [
    CoreModule,
    SharedModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useExisting: JwtGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useExisting: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
