import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID } from 'class-validator';
import { UnitResponseDto } from './unit.dto';

export class CreateMaterialDto {
  @ApiProperty({
    description: 'Unique code for the material',
    example: 'MAT001',
  })
  @IsString()
  code: string;
  // name
  @ApiProperty({
    description: 'Name of the material',
    example: 'Ladrillo rojo',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the material',
    example: 'Ladrillo rojo',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'UUID of the associated unit',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  unitId: string;

  @ApiProperty({
    description: 'Price in pesos',
    example: 150.5,
    minimum: 0,
  })
  @IsNumber()
  price: number;
}

export class UpdateMaterialDto extends CreateMaterialDto {}

export class MaterialResponseDto extends UpdateMaterialDto {
  @ApiProperty({
    description: 'Associated unit information',
    type: UnitResponseDto,
  })
  unit: UnitResponseDto;

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
