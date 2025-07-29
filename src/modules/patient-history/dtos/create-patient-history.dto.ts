import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreatePatientHistoryDto {
  @IsDateString()
  @IsNotEmpty()
  recordDate: Date;

  @IsString()
  @IsNotEmpty()
  recordType: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  mainComplaint: string;

  @IsString()
  @IsOptional()
  currentDiseaseHistory?: string;

  @IsString()
  @IsOptional()
  physicalExam?: string;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsString()
  @IsNotEmpty()
  treatment: string;

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
  @IsNotEmpty()
  professionalId: number;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;
} 