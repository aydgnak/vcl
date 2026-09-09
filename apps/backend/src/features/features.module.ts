import { Module } from '@nestjs/common'
import { CarModule } from './car'

@Module({
  imports: [
    CarModule,
  ],
})
export class FeaturesModule {}
