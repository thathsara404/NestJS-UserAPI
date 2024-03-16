import { IsOptional } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  limit?: number;

  @IsOptional()
  skip?: number;
}
