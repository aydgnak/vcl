import type { JwtPayload } from '@app/auth'
import type { Request } from 'express'

export type RequestWithOptionalUser = Omit<Request, 'user'> & {
  user?: JwtPayload
}
