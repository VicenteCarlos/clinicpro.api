import { Module } from '@nestjs/common';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';
import { ProfessionalRepository } from './professional.repository';
import { JwtService } from '@nestjs/jwt';
import { ProfessionalTransformer } from './professional.transformer';
import { SequelizeModule } from '@nestjs/sequelize';
import { Professional } from './professional.entity';
import { RedisService } from 'src/integrations/redis/redis.service';

@Module({
  imports: [SequelizeModule.forFeature([Professional])],
  controllers: [ProfessionalController],
  providers: [
    ProfessionalService,
    ProfessionalRepository,
    JwtService,
    ProfessionalTransformer,
    RedisService,
  ],
  exports: [ProfessionalService],
})
export class ProfessionalModule {}
