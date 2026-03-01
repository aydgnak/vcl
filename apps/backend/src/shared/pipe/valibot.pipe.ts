import type { PipeTransform } from '@nestjs/common'
import type { GenericSchema, InferOutput } from 'valibot'
import { UnprocessableEntityException } from '@nestjs/common'
import { I18nContext } from 'nestjs-i18n'
import { parse } from 'valibot'

export class ValibotPipe<T extends GenericSchema> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown): InferOutput<T> {
    try {
      return parse(this.schema, value, {
        lang: I18nContext.current()?.lang ?? 'en',
      })
    }
    catch (error) {
      throw new UnprocessableEntityException(error)
    }
  }
}
