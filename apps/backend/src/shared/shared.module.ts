import { Module } from '@nestjs/common'
import { CurrentUserModule } from './current-user'
import { PrismaModule } from './prisma'
import { RedisModule } from './redis'

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    CurrentUserModule,
  ],
})
export class SharedModule {}
