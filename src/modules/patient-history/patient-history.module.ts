import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientHistory } from './patient-history.entity';
import { PatientHistoryController } from './patient-history.controller';
import { PatientHistoryService } from './patient-history.service';
import { PatientHistoryRepository } from './patient-history.repository';
import { PatientHistoryTransformer } from './patient-history.transformer';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/integrations/redis/redis.service';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PatientHistory]),
    PatientModule,
  ],
  controllers: [PatientHistoryController],
  providers: [
    PatientHistoryService,
    PatientHistoryRepository,
    PatientHistoryTransformer,
    JwtService,
    RedisService,
  ],
  exports: [PatientHistoryService],
})
export class PatientHistoryModule {}
