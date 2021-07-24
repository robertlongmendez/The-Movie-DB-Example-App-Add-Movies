export class User {
  // What we want to name objects coming back from the API
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  token: string;
  nickname: string;
  constructor({
                // What the objects being returned are named from the API
                id = null,
                first_name = '',
                last_name = '',
                name = '',
                email = '',
                token = '',
                nickname = '',
                ...rest
              }) {
    // Assign what we want to name to the object being returned
    Object.assign(this, rest);
    this.id = id;
    //Since firstName lastName get returned from api as first_name/last_name and on autologin I'm pulling these values from local storage I do a
    // quick if/else statement
    if (!first_name) {
      this.firstName = this.firstName;
      this.lastName = this.lastName;
    } else {
      this.lastName = last_name;
      this.firstName = this.firstName;
    }
    this.name = name;
    this.email = email;
    this.token = token;
    this.nickname = nickname;
  }

}
