import { ConfigO } from '@app/core/config'
import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(
    readonly configService: ConfigService<ConfigO, true>,
  ) {
    super(configService.get('REDIS_URL', { infer: true }))
  }

  async onModuleDestroy() {
    await this.quit()
  }
}
