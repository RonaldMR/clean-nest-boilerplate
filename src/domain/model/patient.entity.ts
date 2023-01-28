import ArgumentEmptyError from 'src/shared/domain/errors/argumentempty.error';
import BaseEntity from 'src/shared/domain/model/base.entity';
import InvalidAgeError from '../errors/invalidage.error';

export default class PatientEntity extends BaseEntity {
  public name: string;
  public species: string;
  public age: number;
  public ageUnit: string;

  constructor(name: string, species: string, age: number, ageUnit: string) {
    super();

    if (!name) {
      throw new ArgumentEmptyError('name');
    }

    if (!species) {
      throw new ArgumentEmptyError('species');
    }

    if (age <= 0) {
      throw new InvalidAgeError();
    }

    this.name = name;
    this.species = species;
    this.age = age;
    this.ageUnit = ageUnit;
  }
}
