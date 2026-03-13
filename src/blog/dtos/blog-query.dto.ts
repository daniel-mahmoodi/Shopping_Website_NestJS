import { IsOptional, IsPositive } from 'class-validator';

export class BlogQueryDto {
  @IsOptional()
  @IsPositive()
  page: number;
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  title: string;
}
