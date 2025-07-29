import { Module } from '@nestjs/common';
import { MedicalRecordController } from './medical-record.controller';
import { MedicalRecordService } from './medical-record.service';
import { MedicalRecordRepository } from './medical-record.repository';
import { JwtService } from '@nestjs/jwt';
import { MedicalRecordTransformer } from './medical-record.transformer';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalRecord } from './medical-record.entity';
import { RedisService } from 'src/integrations/redis/redis.service';

@Module({
  imports: [SequelizeModule.forFeature([MedicalRecord])],
  controllers: [MedicalRecordController],
  providers: [
    MedicalRecordService,
    MedicalRecordRepository,
    JwtService,
    MedicalRecordTransformer,
    RedisService,
  ],
  exports: [MedicalRecordService],
})
export class MedicalRecordModule {} 