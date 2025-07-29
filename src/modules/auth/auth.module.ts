import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { RedisService } from 'src/integrations/redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from 'src/integrations/nodemailer/nodemailer.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [RedisService, AuthService, JwtService, MailService],
})
export class AuthModule {}
