import type { CreateCarO, PaginationO, UpdateCarO } from 'shared/schemas'
import { ValibotPipe } from '@app/common/pipes'
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query, SerializeOptions } from '@nestjs/common'
import { createCarSchema, paginationSchema, updateCarSchema } from 'shared/schemas'
import { CarService } from './car.service'
import { CarDto, PaginatedCarDto } from './dto'

@Controller('car')
@SerializeOptions({ type: CarDto })
export class CarController {
  constructor(
    private readonly carService: CarService,
  ) {}

  @Post()
  async create(
    @Body(new ValibotPipe(createCarSchema)) createCarData: CreateCarO,
  ) {
    return this.carService.create(createCarData)
  }

  @Get()
  @SerializeOptions({ type: PaginatedCarDto })
  async findAll(
    @Query(new ValibotPipe(paginationSchema)) pagination: PaginationO,
  ) {
    return this.carService.findAll(pagination)
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ) {
    return this.carService.findOne(uuid)
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(new ValibotPipe(updateCarSchema)) updateCarData: UpdateCarO,
  ) {
    return this.carService.update(uuid, updateCarData)
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ) {
    await this.carService.remove(uuid)
  }
}
