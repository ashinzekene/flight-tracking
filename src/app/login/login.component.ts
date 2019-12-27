import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  hidePassword = true;
  errorText = '';
  waiting = false;

  constructor(private router: Router, private auth: AuthService) { }

  onSubmit() {
    this.waiting = true;
    this.errorText = '';
    this.auth.logIn(this.username.value, this.password.value)
      .subscribe(
        () => {
          this.router.navigateByUrl('/');
          this.waiting = false;
        },
        err => {
          this.errorText = err.message;
          this.waiting = false;
        }
      );
  }

}
