import { Exclude, Expose } from 'class-transformer'
import { PayloadType } from '../types'

@Exclude()
export class PayloadDto implements PayloadType {
  @Expose()
  uuid: string

  @Expose()
  email: string
}
