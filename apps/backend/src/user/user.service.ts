import { CurrentUserService } from '@app/shared/current-user'
import { PrismaService } from '@app/shared/prisma'
import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

interface CurrentUser {
  name?: string | null
  surname?: string | null
  email: string
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly currentUser: CurrentUserService,
  ) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findOne(uuid: string) {
    return this.prisma.user.findUnique({
      where: {
        uuid,
      },
    })
  }

  async create(email: string, password: string) {
    return this.prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
        profile: {
          create: {},
        },
      },
    })
  }

  async me() {
    const { profile, email } = await this.currentUser.getUser()
    const { name, surname } = profile ?? {}

    return {
      name,
      surname,
      email,
    } satisfies CurrentUser
  }
}
