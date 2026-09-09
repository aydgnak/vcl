import { Global, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ClsModule } from 'nestjs-cls'
import { CurrentUserService } from './current-user.service'
import { CurrentUserInterceptor } from './interceptors'

@Global()
@Module({
  imports: [
    ClsModule,
  ],
  providers: [
    CurrentUserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  exports: [
    CurrentUserService,
  ],
})
export class CurrentUserModule {}
