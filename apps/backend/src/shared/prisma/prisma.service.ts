import { ConfigO } from '@app/core/config'
import { PrismaClient } from '@app/generated/prisma/client'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(
    readonly configService: ConfigService<ConfigO, true>,
  ) {
    const adapter = new PrismaPg({
      connectionString: configService.get('DATABASE_URL', { infer: true }),
    })

    super({ adapter })
  }
}
