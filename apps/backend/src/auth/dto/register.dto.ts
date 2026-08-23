import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class RegisterDto {
  @Expose()
  uuid: string

  @Expose()
  email: string
}
