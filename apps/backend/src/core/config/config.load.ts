import type { ConfigFactory } from '@nestjs/config'
import commonLoad from './common/common.load'

export const configLoads: ConfigFactory[] = [
  commonLoad,
]
