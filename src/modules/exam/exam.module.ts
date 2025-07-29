import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Exam } from './exam.entity';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { ExamRepository } from './exam.repository';
import { ExamTransformer } from './exam.transformer';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/integrations/redis/redis.service';

@Module({
  imports: [SequelizeModule.forFeature([Exam])],
  controllers: [ExamController],
  providers: [
    ExamService,
    ExamRepository,
    ExamTransformer,
    JwtService,
    RedisService,
  ],

  exports: [ExamService],
})
export class ExamModule {}
