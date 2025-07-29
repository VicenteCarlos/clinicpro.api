import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsDateString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class UpdateQueryDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  public patient_id: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  public professional_id: number;

  @ApiProperty({ example: '2025-07-10' })
  @IsDateString()
  public date: string;

  @ApiProperty({ example: '14:30' })
  @IsString()
  public time: string;

  @ApiProperty({ example: 'Cardiologia' })
  @IsString()
  public specialty: string;

  @ApiProperty({ example: 'Paciente relata dores no peito.' })
  @IsOptional()
  @IsString()
  public notes?: string;
}

export class PatchStatusQuery {
  @ApiProperty({
    example: 'confirmada',
    enum: [
      'aguardando',
      'confirmada',
      'em_andamento',
      'concluida',
      'cancelada',
    ],
  })
  @IsString()
  public status: string;
}
