export class Streaming {
  // what you want to call in your app
  logo: string;
  provider: string;

  constructor({
    //constructor is what comes back from the API
    logo_path = '',
    provider_name = '',
    ...rest
  }) {
    Object.assign(this, rest);
    this.logo = logo_path;
    this.provider = provider_name;
  }
}
