import type { CreateCarO, UpdateCarO } from 'schemas'
import { ValibotPipe } from '@app/common/pipes'
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, SerializeOptions } from '@nestjs/common'
import { createCarSchema, updateCarSchema } from 'schemas'
import { CarService } from './car.service'
import { CarDto } from './dto'

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
  async findAll() {
    return this.carService.findAll()
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
