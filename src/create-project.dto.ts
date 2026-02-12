import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Jacket Fabrication - Block A1' })
  @IsString()
  projectName: string;

  @ApiProperty({ example: 'Chevron' })
  @IsString()
  clientName: string;

  @ApiProperty({ example: 15 })
  @IsNumber()
  @Min(0)
  @Max(100)
  progressPercentage: number;

  @ApiProperty({ example: 'In Progress' })
  @IsString()
  status: string;
}