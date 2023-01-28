import Repository from 'src/shared/domain/repository/repository';
import PatientEntity from '../model/patient.entity';

export default abstract class PatientRepository extends Repository<PatientEntity> {}
