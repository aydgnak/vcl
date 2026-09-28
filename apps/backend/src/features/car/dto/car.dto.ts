import { Exclude, Expose } from 'class-transformer'
import { CarR } from 'shared/types'

@Exclude()
export class CarDto implements CarR {
  @Expose()
  uuid: string

  @Expose()
  plate: string

  @Expose()
  brand: string

  @Expose()
  model: string

  @Expose()
  modelYear: number
}
