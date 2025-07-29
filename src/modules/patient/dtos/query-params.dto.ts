import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  full_name?: string;
}
