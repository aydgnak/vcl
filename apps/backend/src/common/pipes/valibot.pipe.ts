import type { PipeTransform } from '@nestjs/common'
import type { GenericSchema, InferOutput } from 'valibot'
import { UnprocessableEntityException } from '@nestjs/common'
import { getDotPath, safeParse } from 'valibot'

export class ValibotPipe<T extends GenericSchema> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown): InferOutput<T> {
    const result = safeParse(this.schema, value)

    if (!result.success) {
      throw new UnprocessableEntityException({
        message: 'Validation failed.',
        issues: result.issues.map(issue => ({
          path: getDotPath(issue),
          message: issue.message,
        })),
      })
    }

    return result.output
  }
}
