import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = new User(0, "", "", "", "", "", "");
  cpass: any;

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (!this.isFormValid()) {
      return; // Stop submission if validation fails
    }

    if (this.user.password === this.cpass) {
      console.log(this.user);
      this.authService.register(this.user).subscribe(
        Response => {
          console.log('Registration successful', Response);
          Swal.fire({
            title: 'Success!',
            text: 'Your registration was successful.',
            icon: 'success',
            confirmButtonText: 'Cool'
          });
          this.router.navigate(['login']);
        },
        error => {
          console.error('Registration failed', error);
          if (error.status === 500) {
            Swal.fire({
              title: 'Error!',
              text: 'Email-Id already registered.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        }
      );
    } else {
      console.error('Password doesn\'t match!');
      Swal.fire({
        title: 'Error!',
        text: 'Password and Confirm password should be the same!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  // Validation function
  isFormValid(): boolean {
    // Username validation
    if (!this.user.username || this.user.username.length < 3) {
      Swal.fire({
        title: 'Error!',
        text: 'Username must be at least 3 characters long!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.user.email)) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid email address!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return false;
    }

    // Phone number validation (10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(this.user.phone)) {
      Swal.fire({
        title: 'Error!',
        text: 'Phone number must be exactly 10 digits!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return false;
    }

    // Password validation (min 8 characters, at least one number and symbol)
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(this.user.password)) {
      Swal.fire({
        title: 'Error!',
        text: 'Password must be at least 8 characters long and include at least one number and one symbol!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return false;
    }

    return true; // All fields are valid
  }
}
