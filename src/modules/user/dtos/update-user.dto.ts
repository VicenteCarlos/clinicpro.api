import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'joao@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty({ example: 'clinicpro' })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  public clinicId: number;

  @ApiProperty({ example: 'Senha@forte123' })
  @IsNotEmpty()
  @IsString()
  public password: string;
}

export class ActiveUserDto {
  @ApiProperty({ example: true })
  @IsNotEmpty()
  public isActive: boolean;
}
