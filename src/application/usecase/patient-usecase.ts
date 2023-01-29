import PatientRepository from 'src/domain/repository/patient-repository';
import AddPatientResponseDto from '../dto/response/addpatient-response.dto';
import AddPatientRequestDto from '../dto/request/addpatient-request.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import PatientEntity from 'src/domain/model/patient.entity';
import UpdatePatientRequestDto from '../dto/request/updatepatient-request.dto';
import GetPatientResponseDto from '../dto/response/getpatient.response.dto';

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

  public async updatePatient(request: UpdatePatientRequestDto): Promise<void> {
    const patient = await this.getPatientById(request.id);

    patient.age = request.age;
    patient.ageUnit = request.ageUnit;
    patient.name = request.name;
    patient.species = request.species;

    await this.patientRepository.update(patient);
  }

  public async getPatient(id: string): Promise<GetPatientResponseDto> {
    const patient = await this.getPatientById(id);

    const response = new GetPatientResponseDto();

    response.id = patient.id;
    response.name = patient.name;
    response.species = patient.species;
    response.age = patient.age;

    return response;
  }

  public async deletePatient(id: string): Promise<void> {
    const patient = await this.getPatientById(id);
    await this.patientRepository.delete(patient.id);
  }

  private async getPatientById(id: string): Promise<PatientEntity> {
    const patient = await this.patientRepository.get(id);

    if (!patient) {
      throw new NotFoundException(`Patient ${id} not found`);
    }

    return patient;
  }
}
