import type { ClsStore } from 'nestjs-cls'

export interface CurrentUserClsTypes extends ClsStore {
  uuid: string
}
