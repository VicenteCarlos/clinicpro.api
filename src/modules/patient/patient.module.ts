import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PatientRepository } from './patient.repository';
import { JwtService } from '@nestjs/jwt';
import { PatientTransformer } from './patient.transformer';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './patient.entity';
import { RedisService } from 'src/integrations/redis/redis.service';

@Module({
  imports: [SequelizeModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [
    PatientService,
    PatientRepository,
    JwtService,
    PatientTransformer,
    RedisService,
  ],
  exports: [PatientService],
})
export class PatientModule {}
