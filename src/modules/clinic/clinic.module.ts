import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Clinic } from './clinic.entity';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';
import { ClinicRepository } from './clinic.repository';
import { ClinicTransformer } from './clinic.transformer';
import { RedisService } from 'src/integrations/redis/redis.service';

@Module({
  imports: [SequelizeModule.forFeature([Clinic])],
  controllers: [ClinicController],
  providers: [ClinicService, ClinicRepository, ClinicTransformer, JwtService, RedisService],
})
export class ClinicModule {}
