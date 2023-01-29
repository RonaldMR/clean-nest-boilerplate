import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
export default class UpdatePatientRequestDto {
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  species: string;

  @IsInt()
  @ApiProperty()
  age: number;

  @IsNotEmpty()
  @ApiProperty()
  ageUnit: string;
}
