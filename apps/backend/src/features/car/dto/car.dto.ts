import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class CarDto {
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
