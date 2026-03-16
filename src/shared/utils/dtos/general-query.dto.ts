import { IsEnum, IsOptional, IsPositive } from 'class-validator';

export enum Sort{
    title= "titel",
    createdAt= "createdAt",  
    updatedAt= "updatedAt"
}

export class GeneralQueryDto {
  
  @IsOptional()
  @IsPositive()
  page?: number;
  
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  title?: string;

  @IsOptional()
  @IsEnum(Sort)
  sort?: Sort;
}
