import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleModuleDto {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    example: '0',
    required: true,
  })
  @IsNumber()
  @Min(1)
  moduleId: number;
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    example: '0',
    required: true,
  })
  @IsNumber()
  @Min(1)
  roleId: number;
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    example: '0',
    required: true,
  })
  @IsNumber()
  @Min(1)
  permission: number;
}
