import { Exclude, Expose } from 'class-transformer'
import { RegisterR } from 'shared/types'

@Exclude()
export class RegisterDto implements RegisterR {
  @Expose()
  uuid: string

  @Expose()
  email: string
}
