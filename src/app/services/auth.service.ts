import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }

  public registerdUserData: Object;
  public isValid_user: boolean;
  public indexValue: number = -1;

  isAuthenticated(email: any, password: any) {
    this.registerdUserData = JSON.parse(localStorage.getItem('user_data'));
    for (const i in this.registerdUserData) {
      if (
        this.registerdUserData[i].email == email &&
        this.registerdUserData[i].password == password
      ) {
        this.isValid_user = true;
        this.indexValue = parseInt(i);
        return true;
      }
    }
    return false;
  }

  // getIndexValue(){
  //   return this.indexValue;
  // }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}
