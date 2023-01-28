import { v4 as uuidv4 } from 'uuid';

export default class BaseEntity {
  private _id: string;

  public get id(): string {
    return this._id;
  }

  constructor(id?: string) {
    if (id) {
      this._id = id;
    } else {
      this._id = uuidv4();
    }
  }
}
