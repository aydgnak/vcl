import { UnprocessableEntityException } from '@nestjs/common'
import { safeParse } from 'valibot'
import { configSchema } from './config.schema'

export function configValidate(config: Record<string, unknown>) {
  const parsedConfig = safeParse(configSchema, config)

  if (!parsedConfig.success) {
    const errorMessage = parsedConfig.issues
      .map((error) => {
        return error.message
      })
      .join(' | ')

    throw new UnprocessableEntityException(errorMessage)
  }

  return parsedConfig.output
}
