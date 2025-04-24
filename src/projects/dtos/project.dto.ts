import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Name of the project',
    example: 'New Building Project',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the project',
    example: 'A new residential building project with 100 units',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'City ID',
  })
  @IsUUID()
  cityId: string;
}

export class UpdateProjectDto {
  @ApiProperty({
    description: 'Name of the project',
    example: 'Updated Building Project',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description of the project',
    example: 'An updated residential building project with 150 units',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'City ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  cityId?: string;
}

export class AddMaterialToProjectDto {
  @ApiProperty({
    description: 'ID of the material to add',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  materialId: string;

  @ApiProperty({
    description: 'Quantity of the material',
    example: 10.5,
    minimum: 0,
  })
  @IsNumber()
  quantity: number;
}

export class ProjectResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the project',
    example: 'New Building Project',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the project',
    example: 'A new residential building project with 100 units',
  })
  description: string;

  @ApiProperty({
    description: 'City where the project is located',
    example: 'Medellín',
  })
  city: string;

  @ApiProperty({
    description: 'Date when the project was created',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the project was last updated',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
} 