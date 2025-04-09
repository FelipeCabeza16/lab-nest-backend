import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({
    description: 'Name of the unit (e.g., M², Unidad, Kg)',
    example: 'M²',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the unit',
    example: 'Metro cuadrado',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateUnitDto extends CreateUnitDto {
  @ApiProperty({
    description: 'UUID of the unit',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;
}

export class UnitResponseDto extends UpdateUnitDto {
  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-03-14T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-03-14T12:00:00Z',
  })
  updatedAt: Date;
}
