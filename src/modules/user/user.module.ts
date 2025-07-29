import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserTransformer } from './user.transformer';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { RedisService } from 'src/integrations/redis/redis.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService, UserTransformer, RedisService],
  exports: [UserService],
})
export class UserModule {}
