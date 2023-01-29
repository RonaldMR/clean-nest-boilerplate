import PatientRepository from 'src/domain/repository/patient-repository';
import MockPatientSchema from './mockpatient.schema';
import { Injectable } from '@nestjs/common';
import PatientEntity from 'src/domain/model/patient.entity';

@Injectable()
export default class MockPatientRepository extends PatientRepository {
  public async update(entityObject: PatientEntity): Promise<void> {
    const found = this.data.find((patient) => patient.id === entityObject.id);

    if (found) {
      found.name = entityObject.name;
      found.species = entityObject.species;
      found.age = entityObject.age;
      found.species = entityObject.species;
    }
  }
  public async get(id: string): Promise<PatientEntity> {
    const found = this.data.find((patient) => patient.id === id);

    if (!found) {
      return undefined;
    }

    return new PatientEntity(
      found.name,
      found.species,
      found.age,
      found.ageUnit,
      found.id,
    );
  }
  public delete(id: string): Promise<void> {
    this.data = this.data.filter((patient) => patient.id !== id);
    return;
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
  }
}
