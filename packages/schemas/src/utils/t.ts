import type { BaseIssue } from 'valibot'
import { fallbackLocale, locales } from '../locales'

export type NestedMessages = Record<string, string | Record<string, string | Record<string, string>>>

function resolve(obj: NestedMessages, key: string): string | undefined {
  const parts = key.split('.')
  let current: unknown = obj

  for (const part of parts) {
    if (current == null || typeof current !== 'object')
      return undefined
    current = (current as Record<string, unknown>)[part]
  }

  return typeof current === 'string' ? current : undefined
}

function interpolate(message: string, params: Record<string, unknown>, issue: Record<string, unknown>): string {
  return message.replace(/\{(\w+)\}/g, (match, name: string) => {
    if (name in params)
      return String(params[name])
    if (name in issue)
      return String(issue[name])
    return match
  })
}

export function t(key: string, params: Record<string, unknown> = {}): (issue: BaseIssue<unknown>) => string {
  return (issue) => {
    const lang = issue.lang ?? fallbackLocale

    const message = resolve(locales[lang], key)
      ?? resolve(locales[fallbackLocale], key)
      ?? key

    return interpolate(message, params, issue as unknown as Record<string, unknown>)
  }
}
