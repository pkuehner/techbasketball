export class Mail {
  mail: string;
  name: string;
  message: string;
  phone: string;

  //assign vals from json to properties
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
