import PatientRepository from 'src/domain/repository/patient-repository';
import MockPatientSchema from './mockpatient.schema';
import { Injectable } from '@nestjs/common';
import PatientEntity from 'src/domain/model/patient.entity';

@Injectable()
export default class MockPatientRepository extends PatientRepository {
  public update(entityObject: PatientEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public get(id: string): Promise<PatientEntity> {
    throw new Error('Method not implemented.');
  }
  public delete(id: string): Promise<PatientEntity> {
    throw new Error('Method not implemented.');
  }
  private data: MockPatientSchema[];

  constructor() {
    super();
    this.data = [];
  }

  public async add(patient: PatientEntity): Promise<void> {
    this.data.push({
      id: patient.id,
      name: patient.name,
      species: patient.species,
      age: patient.age,
      ageUnit: patient.ageUnit.toString(),
    });

    console.log(this.data);
  }
}
