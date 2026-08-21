import * as v from 'valibot'
import { configSchema } from './config.schema'

export function validate(config: Record<string, unknown>) {
  const parsedConfig = v.safeParse(configSchema, config)

  if (!parsedConfig.success) {
    throw new Error(
      parsedConfig.issues.map((issue) => {
        return `Dot Path: ${v.getDotPath(issue)}, Message: ${issue.message}`
      }).join('\n'),
    )
  }

  return parsedConfig.output
}
