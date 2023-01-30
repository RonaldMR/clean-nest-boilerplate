import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PatientController } from './presentation/restapi/controllers/patient.controller';
import PatientUseCase from './application/usecase/patient-usecase';
import PatientRepository from './domain/repository/patient-repository';
import MockPatientRepository from './infrastructure/repository/mock/mockpatient.repository';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './presentation/restapi/exceptionfilters/all.exceptionfilter';
import RequestIdAdapter from './infrastructure/adapters/request-id.adapter';
import RequestIdMiddleware from './presentation/restapi/middlewares/requestid.middleware';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [
    PatientUseCase,
    { provide: PatientRepository, useClass: MockPatientRepository },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    RequestIdAdapter,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
