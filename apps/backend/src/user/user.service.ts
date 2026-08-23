import { PrismaService } from '@app/shared/prisma'
import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
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
      },
    })
  }
}
