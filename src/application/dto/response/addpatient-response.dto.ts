import { ApiProperty } from '@nestjs/swagger';

export default class AddPatientResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  species: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  ageUnit: string;
}
