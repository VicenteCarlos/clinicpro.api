import { IsOptional, IsString } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  name?: string;
} 