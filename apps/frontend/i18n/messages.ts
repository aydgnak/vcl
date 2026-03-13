export type MessageParams = Record<string, number | string>
export interface Messages {
  [key: string]: Messages | string
}

type MessageValue = Messages | string

const INTERPOLATION_PATTERN = /\{(\w+)\}/g

function resolveMessage(messages: Messages, key: string): string | undefined {
  const parts = key.split('.')
  let current: MessageValue | undefined = messages

  for (const part of parts) {
    if (current == null || typeof current === 'string')
      return undefined

    current = current[part]
  }

  return typeof current === 'string' ? current : undefined
}

export function translate(messages: Messages, key: string, params: MessageParams = {}): string {
  const message = resolveMessage(messages, key)

  if (message === undefined)
    return key

  return message.replace(INTERPOLATION_PATTERN, (match, name: string) => {
    if (Object.hasOwn(params, name))
      return String(params[name])

    return match
  })
}
