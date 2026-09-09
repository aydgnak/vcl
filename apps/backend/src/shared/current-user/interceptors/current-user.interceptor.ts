import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { ClsService } from 'nestjs-cls'
import { CurrentUserClsTypes, RequestWithOptionalUser } from '../types'

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private readonly cls: ClsService<CurrentUserClsTypes>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<RequestWithOptionalUser>()

    if (request.user) {
      this.cls.set('uuid', request.user.sub)
    }

    return next.handle()
  }
}
