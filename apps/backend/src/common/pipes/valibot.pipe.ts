import type { I18nTranslations } from '@app/generated/i18n.generated'
import type { PipeTransform } from '@nestjs/common'
import type { GenericSchema, InferOutput } from 'valibot'
import { UnprocessableEntityException } from '@nestjs/common'
import { I18nContext } from 'nestjs-i18n'
import { getDotPath, safeParse } from 'valibot'

export class ValibotPipe<T extends GenericSchema> implements PipeTransform {
  constructor(private readonly schema: T) {}

  transform(value: unknown): InferOutput<T> {
    const i18n = I18nContext.current<I18nTranslations>()

    const result = safeParse(this.schema, value, {
      lang: i18n?.lang ?? 'en',
    })

    if (!result.success) {
      throw new UnprocessableEntityException({
        message: i18n?.t('validation.failed') ?? 'Validation failed.',
        issues: result.issues.map(issue => ({
          path: getDotPath(issue),
          message: issue.message,
        })),
      })
    }

    return result.output
  }
}
