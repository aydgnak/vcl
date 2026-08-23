import type { InferOutput } from 'valibot'
import { object, pipe, string, url } from 'valibot'

export const redisSchema = object({
  REDIS_URL: pipe(string(), url()),
})

export type RedisO = InferOutput<typeof redisSchema>
