import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class UpdatePatientHistoryDto {
  @IsDateString()
  @IsOptional()
  recordDate?: Date;

  @IsString()
  @IsOptional()
  recordType?: string;

  @IsString()
  @IsOptional()
  specialty?: string;

  @IsString()
  @IsOptional()
  mainComplaint?: string;

  @IsString()
  @IsOptional()
  currentDiseaseHistory?: string;

  @IsString()
  @IsOptional()
  physicalExam?: string;

  @IsString()
  @IsOptional()
  diagnosis?: string;

  @IsString()
  @IsOptional()
  treatment?: string;

  @IsString()
  @IsOptional()
  followUp?: string;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsNumber()
  @IsOptional()
  queryId?: number;

  @IsNumber()
  @IsOptional()
  professionalId?: number;

  @IsNumber()
  @IsOptional()
  patientId?: number;
} 