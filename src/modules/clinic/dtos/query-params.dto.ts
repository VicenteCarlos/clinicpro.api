import { IsInt, IsOptional, Min } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
