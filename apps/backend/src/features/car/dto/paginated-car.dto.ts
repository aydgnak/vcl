import type { PaginatedR } from 'shared/types'
import { PaginationMetaDto } from '@app/common/dto'
import { Expose, Type } from 'class-transformer'
import { CarDto } from './car.dto'

export class PaginatedCarDto implements PaginatedR<CarDto> {
  @Expose()
  @Type(() => CarDto)
  data: CarDto[]

  @Expose()
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto
}
