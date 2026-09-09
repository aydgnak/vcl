import { I18nTranslations } from '@app/generated/i18n.generated'
import { Prisma } from '@app/generated/prisma/client'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ClsService } from 'nestjs-cls'
import { I18nService } from 'nestjs-i18n'
import { PrismaService } from '../prisma'
import { RedisService } from '../redis'
import { CurrentUserClsTypes } from './current-user.types'

type User = Prisma.UserGetPayload<{
  omit: {
    password: true
    createdAt: true
    updatedAt: true
  }
}>

@Injectable()
export class CurrentUserService {
  constructor(
    private readonly cls: ClsService<CurrentUserClsTypes>,
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  private getUserUUID(): string {
    return this.cls.get('uuid')
  }

  private getCacheKey(uuid: string): string {
    return `user:${uuid}`
  }

  async getUser(): Promise<User> {
    const userUUID = this.getUserUUID()
    const cacheKey = this.getCacheKey(userUUID)

    let cache = await this.redis.get(cacheKey)

    if (cache === null) {
      const user = await this.prisma.user.findUnique({
        where: {
          uuid: userUUID,
        },
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      if (!user) {
        throw new NotFoundException(this.i18n.t('user.notFound'))
      }

      cache = JSON.stringify(user)

      await this.redis.set(cacheKey, cache, 'EX', 600)
    }

    return JSON.parse(cache) as User
  }

  async invalidateCache(): Promise<void> {
    const userUUID = this.getUserUUID()
    const cacheKey = this.getCacheKey(userUUID)

    await this.redis.del(cacheKey)
  }
}
