import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({ description: 'Name of the unit', example: 'Metro cuadrado' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Symbol of the unit', example: 'm²' })
  @IsString()
  symbol: string;

  @ApiProperty({ description: 'Code of the unit', example: 'M2' })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Description of the unit',
    example: 'Unidad de medida de superficie',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateUnitDto extends CreateUnitDto {
  @ApiProperty({ description: 'UUID of the unit', example: 'uuid' })
  @IsUUID()
  id: string;
}

export class UnitResponseDto extends UpdateUnitDto {
  @ApiProperty({ description: 'Created timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated timestamp' })
  updatedAt: Date;
}
