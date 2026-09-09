import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { ClsService } from 'nestjs-cls'
import { CurrentUserClsTypes } from '../types'

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private readonly cls: ClsService<CurrentUserClsTypes>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>()

    this.cls.set('uuid', request.user.sub)

    return next.handle()
  }
}
