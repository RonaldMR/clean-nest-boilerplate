import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import AddPatientRequestDto from 'src/application/dto/request/addpatient-request.dto';
import UpdatePatientRequestDto from 'src/application/dto/request/updatepatient-request.dto';
import AddPatientResponseDto from 'src/application/dto/response/addpatient-response.dto';
import GetPatientResponseDto from 'src/application/dto/response/getpatient.response.dto';
import PatientUseCase from 'src/application/usecase/patient-usecase';

@ApiTags('patient')
@Controller('/patient')
export class PatientController {
  constructor(private readonly patientUseCase: PatientUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Add new patient' })
  @HttpCode(201)
  async add(
    @Body() request: AddPatientRequestDto,
  ): Promise<AddPatientResponseDto> {
    return await this.patientUseCase.addPatient(request);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update patient' })
  @ApiParam({ name: 'id', type: String, description: 'Patient Id' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdatePatientRequestDto,
  ): Promise<void> {
    request.id = id;
    await this.patientUseCase.updatePatient(request);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get patient' })
  @ApiParam({ name: 'id', type: String, description: 'Patient Id' })
  async get(@Param('id') id: string): Promise<GetPatientResponseDto> {
    return await this.patientUseCase.getPatient(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete patient' })
  @ApiParam({ name: 'id', type: String, description: 'Patient Id' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.patientUseCase.deletePatient(id);
  }
}
