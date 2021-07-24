import { Component } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import {User} from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  loginForm: FormGroup;
  loginFormValues: any;
  submitting = false;
  hasError = false;
  errorMsg: string;
  user: User;
  private subs = new Subscription();

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.loginFormValues = {
      email: ['', Validators.required],
      password: ['', Validators.required]
    };
  }

  createForm() {
    this.loginForm = this.fb.group(this.loginFormValues);
  }

  submitForm() {
    this.hasError = false;
    this.submitting = true;
    this.errorMsg = null;
    if (this.loginForm.invalid) {
      this.hasError = true;
      this.submitting = false;
      return;
    }
    const form = this.loginForm.value;
    const params = { email: form.email, password: form.password };
    this.subs.add(
      this.authService.login(params).subscribe(data => {
        if (data) {
          this.user = data.payload;
          this.submitting = false;
          this.router.navigate(['/movies']);
        }
      }, error => {
        if (error) {
          console.log(error);
          this.submitting = false;
          this.hasError = true;
          this.errorMsg = 'Email and Password combination do not exist in this system!';
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
