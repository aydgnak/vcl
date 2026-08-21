import type { ConfigFactory } from '@nestjs/config'
import databaseLoad from './database/database.load'
import runtimeLoad from './runtime/runtime.load'

export const loads: ConfigFactory[] = [
  runtimeLoad,
  databaseLoad,
]
