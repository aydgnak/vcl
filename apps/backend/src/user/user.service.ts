import { AuthProvider } from '@app/generated/prisma/client'
import { PrismaService } from '@app/shared'
import { I18nTranslations } from '@i18n'
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { I18nService } from 'nestjs-i18n'

interface UserSecurityData {
  id: number
  password: string | null
  accounts: Array<{
    provider: AuthProvider
  }>
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService<I18nTranslations>,
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

  async getSecurityByUuid(uuid: string) {
    const user = await this.getSecurityUserOrThrow(uuid)

    return {
      hasPassword: user.password !== null,
      providers: user.accounts.map(account => account.provider),
      providerCount: user.accounts.length,
    }
  }

  async setPassword(uuid: string, newPassword: string) {
    const user = await this.getSecurityUserOrThrow(uuid)

    if (user.password !== null) {
      throw new ConflictException(this.i18n.t('auth.passwordAlreadySet'))
    }

    const hashedPassword = await hash(newPassword, 10)

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    })
  }

  async updatePassword(uuid: string, currentPassword: string, newPassword: string) {
    const user = await this.getSecurityUserOrThrow(uuid)

    if (user.password === null) {
      throw new BadRequestException(this.i18n.t('auth.passwordNotSet'))
    }

    const isPasswordMatch = await compare(currentPassword, user.password)

    if (!isPasswordMatch) {
      throw new UnauthorizedException(this.i18n.t('auth.currentPasswordInvalid'))
    }

    const hashedPassword = await hash(newPassword, 10)

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    })
  }

  async removePassword(uuid: string, currentPassword: string) {
    const user = await this.getSecurityUserOrThrow(uuid)

    if (user.password === null) {
      throw new BadRequestException(this.i18n.t('auth.passwordNotSet'))
    }

    const isPasswordMatch = await compare(currentPassword, user.password)

    if (!isPasswordMatch) {
      throw new UnauthorizedException(this.i18n.t('auth.currentPasswordInvalid'))
    }

    if (user.accounts.length === 0) {
      throw new BadRequestException(this.i18n.t('auth.passwordRemovalRequiresProvider'))
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: null,
      },
    })
  }

  private async getSecurityUserOrThrow(uuid: string): Promise<UserSecurityData> {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid,
      },
      select: {
        id: true,
        password: true,
        accounts: {
          select: {
            provider: true,
          },
        },
      },
    })

    if (!user) {
      throw new UnauthorizedException(this.i18n.t('auth.unauthorized'))
    }

    return user
  }
}
