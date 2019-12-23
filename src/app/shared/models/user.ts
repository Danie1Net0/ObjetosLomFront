export class User {
  // tslint:disable-next-line:variable-name
  _id: string;
  name: string;
  lastName: string;
  email: string;
  institution: string;
  role: string;
  active: boolean;

  static setUser(user): void {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  static getUser() {
    return JSON.parse(window.localStorage.getItem('user'));
  }
}
