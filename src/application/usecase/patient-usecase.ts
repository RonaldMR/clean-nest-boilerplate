import PatientRepository from 'src/domain/repository/patient-repository';
import AddPatientResponseDto from '../model/response/addpatient-response.dto';
import AddPatientRequestDto from '../model/request/addpatient-request.dto';
import { Injectable } from '@nestjs/common';
import PatientEntity from 'src/domain/model/patient.entity';

@Injectable()
export default class PatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  public async addPatient(
    request: AddPatientRequestDto,
  ): Promise<AddPatientResponseDto> {
    const patient = new PatientEntity(
      request.name,
      request.species,
      request.age,
      request.ageUnit,
    );

    await this.patientRepository.add(patient);

    const response = new AddPatientResponseDto();
    response.id = patient.id;
    response.name = patient.name;
    response.species = patient.species;
    response.age = patient.age;
    response.ageUnit = patient.ageUnit.toString();

    return response;
  }
}
