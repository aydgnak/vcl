import { Global, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ClsModule } from 'nestjs-cls'
import { CurrentUserInterceptor } from './current-user.interceptor'
import { CurrentUserService } from './current-user.service'

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
