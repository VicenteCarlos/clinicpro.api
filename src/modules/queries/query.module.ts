import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { QueryRepository } from './query.repository';
import { JwtService } from '@nestjs/jwt';
import { QueryTransformer } from './query.transformer';
import { SequelizeModule } from '@nestjs/sequelize';
import { Query } from './query.entity';
import { RedisService } from 'src/integrations/redis/redis.service';
import { ProfessionalModule } from '../professional/professional.module';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [SequelizeModule.forFeature([Query]), ProfessionalModule, PatientModule],
  controllers: [QueryController],
  providers: [
    QueryService,
    QueryRepository,
    JwtService,
    QueryTransformer,
    RedisService,
  ],
  exports: [],
})
export class QueryModule {}
