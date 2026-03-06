import { AuthProvider } from '@app/generated/prisma/client'
import { PrismaService } from '@app/shared'
import { Injectable } from '@nestjs/common'

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

  async createByLocal({ email, password }: { email: string, password: string }) {
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    })
  }

  async findByOAuthProvider(provider: AuthProvider, providerId: string) {
    return this.prisma.account.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId,
        },
      },
      include: {
        user: true,
      },
    })
  }

  async findOrCreateByOAuth({ provider, providerId, email }: { provider: AuthProvider, providerId: string, email: string }) {
    const existingAccount = await this.findByOAuthProvider(provider, providerId)

    if (existingAccount) {
      return existingAccount.user
    }

    const existingUser = await this.findByEmail(email)

    if (existingUser) {
      await this.prisma.account.create({
        data: {
          provider,
          providerId,
          userId: existingUser.id,
        },
      })

      return existingUser
    }

    return this.prisma.user.create({
      data: {
        email,
        accounts: {
          create: {
            provider,
            providerId,
          },
        },
      },
    })
  }
}
