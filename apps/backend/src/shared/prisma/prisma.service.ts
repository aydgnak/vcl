import { ConfigSchema } from '@app/core/config'
import { PrismaClient } from '@app/generated/prisma/client'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(
    private readonly configService: ConfigService<ConfigSchema, true>,
  ) {
    const adapter = new PrismaPg({
      connectionString: configService.get<string>('DATABASE_URL'),
    })

    super({ adapter })
  }
}
