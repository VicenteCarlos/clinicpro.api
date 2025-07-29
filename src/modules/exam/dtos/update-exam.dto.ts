import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, ValidateNested, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export enum ExamResultStatus {
  NORMAL = 'normal',
  ALTERED = 'altered',
  CRITICAL = 'critical',
}

export class ExamResultDto {
  @IsString()
  @IsNotEmpty()
  parameter: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsString()
  @IsOptional()
  reference?: string;

  @IsEnum(ExamResultStatus)
  @IsOptional()
  status?: ExamResultStatus;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateExamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsDateString()
  @IsNotEmpty()
  requestDate: Date;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsNotEmpty()
  results: ExamResultDto;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNumber()
  @IsNotEmpty()
  professionalId: number;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;
} 

export class PatchStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}