import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as AOS from 'aos';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    AOS.init();
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)])
  });

  isLoading: boolean = false;

  constructor(private router: Router, private toastr: ToastrService) {}

  onLogin() {

    if (this.loginForm.invalid) {
      this.toastr.error('Please fill out all fields correctly', 'Error');
        console.log(this.loginForm.invalid);

      return;

    }

    this.isLoading = true;

    // Simulated authentication
    const { username, password } = this.loginForm.value;
    console.log({ username, password });

    setTimeout(() => {
      if (username === 'admin@gmail.com' && password === 'password') {
        localStorage.setItem('isLoggedIn', 'true');
        this.toastr.success('Login Successfully', 'Dashboard');
        this.router.navigate(['/dash']);
      }
      else if (username === 'user@gmail.com' && password === 'password') {
        localStorage.setItem('isLoggedIn', 'true');
        this.toastr.success('Login Successfully', 'Home');
        this.router.navigate(['/home']);
      }
      else if (username !== 'user@gmail.com') {
        this.toastr.error('Username Not Found', 'Try again');
      }
      else if (password !== 'password') {
        this.toastr.error('The Password Is Not Correct', 'Try again');
      }
      else {
        this.router.navigate(['/login']);
      }

      this.isLoading = false;
    }, 1000);
  }

}
