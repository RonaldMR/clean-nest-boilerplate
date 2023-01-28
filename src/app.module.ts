import { Module } from '@nestjs/common';
import { PatientController } from './presentation/restapi/patient.controller';
import PatientUseCase from './application/usecase/patient-usecase';
import PatientRepository from './domain/repository/patient-repository';
import MockPatientRepository from './infrastructure/repository/mock/mockpatient.repository';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [
    PatientUseCase,
    { provide: PatientRepository, useClass: MockPatientRepository },
  ],
})
export class AppModule {}
