import { getDotPath, safeParse } from 'valibot'
import { envSchema } from './config.schema'

export function envValidate(config: Record<string, unknown>) {
  const parsedConfig = safeParse(envSchema, config)

  if (!parsedConfig.success) {
    throw new Error(
      [
        'Environment validation failed:',
        ...parsedConfig.issues.map((issue) => {
          const path = getDotPath(issue) ?? 'root'
          return `- ${path}: ${issue.message}`
        }),
      ].join('\n'),
    )
  }

  return parsedConfig.output
}
