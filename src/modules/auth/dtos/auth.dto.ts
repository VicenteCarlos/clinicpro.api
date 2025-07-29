import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthClinicDto {
  @ApiProperty({ example: 'joao@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty({ example: 'Senha@forte123' })
  @IsNotEmpty()
  @IsString()
  public password: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'joao@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty({ example: 'Senha@forte123' })
  @IsNotEmpty()
  @IsString()
  public currentPassword: string;

  @ApiProperty({ example: 'Senha@forte123' })
  @IsNotEmpty()
  @IsString()
  public newPassword: string;
}

export class ConfirmCodeResetPasswordDto {
  @ApiProperty({ example: 'joao@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  public code: string;

  @ApiProperty({ example: 'Senha@forte123' })
  @IsNotEmpty()
  @IsString()
  public newPassword: string;
}
