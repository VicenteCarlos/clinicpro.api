import { IsOptional, IsString } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @IsString()
  page?: number;

  @IsOptional()
  @IsString()
  limit?: number;
}
