import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent {
  userForm: FormGroup;
  passwordAcceptable: boolean = false;

  @Output() userSubmitted = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: this.fb.control("", Validators.required),
      lastName: this.fb.control("", Validators.required),
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required, this.passwordValidator]),
      role: this.fb.control("", Validators.required),
    });

    const passwordControl = this.userForm.get('password');
    if (passwordControl) {
      passwordControl.valueChanges.subscribe(() => {
        this.passwordAcceptable = this.isPasswordAcceptable();
      });
    }
  }

  passwordValidator(control: AbstractControl | null): ValidationErrors | null {
    if (!control) {
      return null;
    }
    const value = control.value;
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const isValid = hasLetter && hasNumber;
  
    return isValid ? null : { invalidPassword: true };
  }

  isEmailInvalid(): boolean {
    const emailControl = this.userForm.get('email');
    return !!emailControl && emailControl.touched && emailControl.hasError('email');
  }
  
  isPasswordInvalid(): boolean {
    const passwordControl = this.userForm.get('password');
    return !!passwordControl && passwordControl.touched && passwordControl.hasError('invalidPassword');
  }
  
  isPasswordAcceptable() {
    const passwordControl = this.userForm.get('password');
    return !!passwordControl && passwordControl.valid && this.passwordValidator(passwordControl) === null;
  }
  
  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.userSubmitted.emit(this.userForm.value);
      this.userForm.reset();
      this.userForm.markAsUntouched();
      this.passwordAcceptable = false;
    }
  }
}
