export class Trailers {
  // what you want to call in your app
  trailer_id: string;
  key: string;
  name: string;

  constructor({
    //constructor is what comes back from the API
    trailer_id = '',
    key = '',
    name = '',
    ...rest
  }) {
    Object.assign(this, rest);
    this.trailer_id = trailer_id;
    this.key = key;
    this.name = name;
  }
}
