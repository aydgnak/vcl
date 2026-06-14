import type { ConfigFactory } from '@nestjs/config'
import runtimeLoad from './runtime/runtime.load'

export const configLoads: ConfigFactory[] = [
  runtimeLoad,
]
