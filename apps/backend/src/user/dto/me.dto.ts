import { Exclude, Expose } from 'class-transformer'
import { MeR } from 'shared/types'

@Exclude()
export class MeDto implements MeR {
  @Expose()
  name: string | null

  @Expose()
  surname: string | null

  @Expose()
  email: string
}
