import type { ClassConstructor } from 'class-transformer'
import { instanceToPlain, plainToInstance } from 'class-transformer'

export function sanitizeWithDto<T>(dto: ClassConstructor<T>, plain: object): T {
  const convertToDto = plainToInstance(dto, plain)

  const dtoToPlain = instanceToPlain(convertToDto)

  return dtoToPlain as T
}
