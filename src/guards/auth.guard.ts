import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AppError } from '../common/AppError';
import { OperationErrors } from '../common/enums/OperationErrors.enum';
import { RedisService } from 'src/integrations/redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userFound = await this.redisService.get(`user:${request.body?.email}`);

    if (userFound) {
      request['user'] = JSON.parse(userFound);
      return true;
    }

    console.log(userFound);

    const tokenJWT = this.extractTokenFromHeader(request);

    if (!tokenJWT) {
      throw new AppError(
        OperationErrors.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
        'Não autorizado',
        false,
      );
    }

    try {
      const tokenDecoded = await this.jwtService.verifyAsync(tokenJWT, {
        secret: this.configService.get('JWT_SECRET'),
      });

      if (!tokenDecoded) {
        throw new AppError(
          OperationErrors.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED,
          'Não autorizado',
          false,
        );
      }

      request['user'] = tokenDecoded;
    } catch (error) {
      throw new AppError(
        OperationErrors.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
        'Não autorizado',
        false,
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token ?? undefined;
  }
}
