import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsObject } from 'class-validator';

export class UpdateProfessionalDto {
  @ApiProperty({ example: 'Dra. Ana Paula' })
  @IsString()
  @IsNotEmpty()
  public full_name: string;

  @ApiProperty({ example: 'ana@clinica.com' })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  @IsString()
  @IsNotEmpty()
  public phone: string;

  @ApiProperty({ example: 'CRM-SP 123456' })
  @IsString()
  @IsNotEmpty()
  public crm: string;

  @ApiProperty({ example: 'Dermatologia' })
  @IsString()
  @IsNotEmpty()
  public specialty: string;

  @ApiProperty({
    example: {
      monday: { start: '08:00', end: '17:00' },
      tuesday: { start: '08:00', end: '17:00' },
    },
  })
  @IsObject()
  public working_hours: Record<string, { start: string; end: string }>;
}
