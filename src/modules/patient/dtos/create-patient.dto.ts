import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  Length,
  IsDate,
  isDateString,
  IsDateString,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @IsNotEmpty()
  public full_name: string;

  @ApiProperty({ example: 'joao@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: '(11) 98765-4321' })
  @IsString()
  public phone: string;

  @ApiProperty({ example: '123.456.789-00' })
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  public cpf: string;

  @ApiProperty({ example: '1990-05-15' })
  @IsDateString()
  @IsOptional()
  public birth_date: Date;

  @ApiProperty({ example: 'Rua das Flores' })
  @IsString()
  public street: string;

  @ApiProperty({ example: '123A' })
  @IsString()
  public number: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  public city: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  @Length(2, 2)
  public state: string;

  @ApiProperty({ example: '12345-678' })
  @IsString()
  @Length(8, 9)
  public zip_code: string;
}
