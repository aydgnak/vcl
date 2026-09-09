import { I18nTranslations } from '@app/generated/i18n.generated'
import { CurrentUserService } from '@app/shared/current-user'
import { PrismaService } from '@app/shared/prisma'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import { CreateCarO, UpdateCarO } from 'schemas'

@Injectable()
export class CarService {
  constructor(
    private readonly currentUser: CurrentUserService,
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async create(createCarData: CreateCarO) {
    const user = await this.currentUser.getUser()

    await this.ensurePlateAvailable(user.id, createCarData.plate)

    return this.prisma.car.create({
      data: {
        ...createCarData,
        userId: user.id,
      },
    })
  }

  async findAll() {
    const user = await this.currentUser.getUser()

    return this.prisma.car.findMany({
      where: {
        userId: user.id,
      },
    })
  }

  async findOne(uuid: string) {
    const user = await this.currentUser.getUser()

    const car = await this.prisma.car.findUnique({
      where: {
        uuid,
        userId: user.id,
      },
    })

    if (!car) {
      throw new NotFoundException(this.i18n.t('car.notFound'))
    }

    return car
  }

  async update(uuid: string, updateCarData: UpdateCarO) {
    const car = await this.findOne(uuid)

    if (updateCarData.plate !== undefined) {
      await this.ensurePlateAvailable(car.userId, updateCarData.plate, car.uuid)
    }

    return this.prisma.car.update({
      where: {
        uuid: car.uuid,
        userId: car.userId,
      },
      data: updateCarData,
    })
  }

  async remove(uuid: string) {
    const car = await this.findOne(uuid)

    return this.prisma.car.delete({
      where: {
        uuid: car.uuid,
        userId: car.userId,
      },
    })
  }

  private async ensurePlateAvailable(userId: number, plate: string, excludeCarUuid?: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        userId_plate: {
          userId,
          plate,
        },
      },
      select: {
        uuid: true,
      },
    })

    if (car && car.uuid !== excludeCarUuid) {
      throw new ConflictException(this.i18n.t('car.plateAlreadyExists'))
    }
  }
}
