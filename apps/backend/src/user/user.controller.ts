import type { Request } from 'express'
import type { RemovePasswordI, SetPasswordI, UpdatePasswordI } from 'schemas'
import { ValibotPipe } from '@app/shared'
import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { removePasswordSchema, setPasswordSchema, updatePasswordSchema } from 'schemas'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('me/security')
  async getSecurity(
    @Req() req: Request,
  ) {
    return this.userService.getSecurityByUuid(req.user.uuid)
  }

  @Post('me/password/set')
  async setPassword(
    @Req() req: Request,
    @Body(new ValibotPipe(setPasswordSchema)) body: SetPasswordI,
  ) {
    await this.userService.setPassword(req.user.uuid, body.newPassword)

    return {
      success: true,
    }
  }

  @Post('me/password/update')
  async updatePassword(
    @Req() req: Request,
    @Body(new ValibotPipe(updatePasswordSchema)) body: UpdatePasswordI,
  ) {
    await this.userService.updatePassword(req.user.uuid, body.currentPassword, body.newPassword)

    return {
      success: true,
    }
  }

  @Post('me/password/remove')
  async removePassword(
    @Req() req: Request,
    @Body(new ValibotPipe(removePasswordSchema)) body: RemovePasswordI,
  ) {
    await this.userService.removePassword(req.user.uuid, body.currentPassword)

    return {
      success: true,
    }
  }
}
