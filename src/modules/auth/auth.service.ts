import { HttpStatus, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/AppError';
import { OperationErrors } from 'src/common/enums/OperationErrors.enum';
import { RedisService } from 'src/integrations/redis/redis.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  AuthClinicDto,
  ConfirmCodeResetPasswordDto,
  ResetPasswordDto,
} from './dtos/auth.dto';
import { MailService } from 'src/integrations/nodemailer/nodemailer.service';
import { UpdateUserDto } from '../user/dtos/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly nodemailerService: MailService,
  ) {}

  async login(loginDto: AuthClinicDto) {
    const userFound = await this.userService.authenticateUserByEmail(
      loginDto.email,
    );

    const isMatched = await bcrypt.compare(
      loginDto.password,
      userFound.dataValues.password,
    );

    if (!isMatched)
      throw new AppError(
        OperationErrors.CONFLICT,
        HttpStatus.CONFLICT,
        'Senha inválida',
        true,
      );

    await this.redisService.set(
      `user:${loginDto.email}`,
      JSON.stringify(userFound),
      7200,
    );

    const token = await this.jwtService.signAsync(
      {
        id: userFound.dataValues.id,
        clinicId: userFound.dataValues.clinicId,
        email: userFound.dataValues.email,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: `${this.configService.get('JWT_EXPIRATION')}h`,
      },
    );

    return token;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const userFound = await this.userService.authenticateUserByEmail(
      resetPasswordDto.email,
    );

    const isMatched = await bcrypt.compare(
      resetPasswordDto.currentPassword,
      userFound.dataValues.password,
    );

    if (!isMatched)
      throw new AppError(
        OperationErrors.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
        'Senha atual inválida',
        true,
      );

    const code = Math.floor(100000 + Math.random() * 900000);

     await this.nodemailerService.sendMail({
      to: resetPasswordDto.email,
      subject: 'Código de Verificação - ClinicPro',
      templateVariables: {
        CODE: code.toString()
      },
      text: `Este é o seu código para confirmar a troca de senha: ${code}\nPossui 1 hora para confirmar a troca de senha`,
    });

    await this.redisService.set(
      `reset-password:${resetPasswordDto.email}`,
      JSON.stringify({
        code,
        email: resetPasswordDto.email,
        clinicId: userFound.dataValues.clinicId,
        id: userFound.dataValues.id,
      }),
      3600,
    );

    return { message: 'Código enviado para o email' };
  }

  async confirmCodeResetPassword(
    confirmCodeResetPasswordDto: ConfirmCodeResetPasswordDto,
  ) {
    const code = await this.redisService.get(
      `reset-password:${confirmCodeResetPasswordDto.email}`,
    );

    const codeParsed = JSON.parse(code as string);

    if (!codeParsed)
      throw new AppError(
        OperationErrors.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        'Código inexistente',
        true,
      );

    console.log(confirmCodeResetPasswordDto.code, codeParsed.code);

    if (+codeParsed.code !== +confirmCodeResetPasswordDto.code)
      throw new AppError(
        OperationErrors.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
        'Código inválido',
        true,
      );

    await this.redisService.del(
      `reset-password:${confirmCodeResetPasswordDto.email}`,
    );

    const passwordUpdated = await this.userService.updateUser(
      {
        password: bcrypt.hashSync(
          confirmCodeResetPasswordDto['newPassword'],
          10,
        ),
      } as UpdateUserDto,
      codeParsed.id,
      codeParsed.clinicId,
    );

    return { passwordUpdated };
  }
}
