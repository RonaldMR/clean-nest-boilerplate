import { Body, Controller, Post } from '@nestjs/common';
import AddPatientRequestDto from 'src/application/model/request/addpatient-request.dto';
import AddPatientResponseDto from 'src/application/model/response/addpatient-response.dto';
import PatientUseCase from 'src/application/usecase/patient-usecase';

@Controller()
export class PatientController {
  constructor(private readonly patientUseCase: PatientUseCase) {}

  @Post('/patient')
  async add(
    @Body() request: AddPatientRequestDto,
  ): Promise<AddPatientResponseDto> {
    return await this.patientUseCase.addPatient(request);
  }
}
