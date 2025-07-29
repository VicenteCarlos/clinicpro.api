import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumber,
  IsArray,
  IsEnum,
} from 'class-validator';

export class UpdateMedicalRecordDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  public patient_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  public professional_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  public appointment_id?: number;

  @ApiProperty({ example: '2024-01-15T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  public record_date: Date;

  @ApiProperty({ example: 'consultation' })
  @IsEnum(['consultation', 'exam', 'procedure', 'prescription', 'emergency'])
  @IsNotEmpty()
  public record_type: string;

  @ApiProperty({ example: 'Cardiologia' })
  @IsString()
  @IsNotEmpty()
  public specialty: string;

  @ApiProperty({ example: 'Dor no peito há 3 dias' })
  @IsString()
  @IsNotEmpty()
  public chief_complaint: string;

  @ApiProperty({ example: 'Paciente relata dor no peito...' })
  @IsString()
  @IsOptional()
  public history_of_present_illness?: string;

  @ApiProperty({ example: 'Exame físico normal' })
  @IsString()
  @IsOptional()
  public physical_examination?: string;

  @ApiProperty({ example: 'Hipertensão arterial sistêmica' })
  @IsString()
  @IsNotEmpty()
  public diagnosis: string;

  @ApiProperty({ example: 'Prescrição de anti-hipertensivo' })
  @IsString()
  @IsNotEmpty()
  public treatment: string;

  @ApiProperty({ example: 'Retorno em 30 dias' })
  @IsString()
  @IsOptional()
  public follow_up?: string;

  @ApiProperty({ example: 'Paciente colaborativo' })
  @IsString()
  @IsOptional()
  public notes?: string;

  @ApiProperty({ example: ['attachment1.pdf', 'attachment2.jpg'] })
  @IsArray()
  @IsOptional()
  public attachments?: string[];
} 