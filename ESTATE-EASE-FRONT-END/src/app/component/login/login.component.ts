import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: any = sessionStorage.getItem('username');
  email: any = sessionStorage.getItem('email');
  password: any = sessionStorage.getItem('password');
  phone: any = sessionStorage.getItem('phone');
  userId = sessionStorage.getItem('userId');
  
  user = new User(0, "", "", "", "", "", "");

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Check if email or password is empty
    if (this.user.email === "" || this.user.password === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your email or password is empty!',
      });
      return; // Exit if email or password is empty
    }

    // Call the login API
    this.authService.login(this.user).subscribe(
      response => {
        console.log('Login successful', response);  // Log the entire response object
        
        // Now inspect the response object in the browser's console
        // Example: If response.user.username exists, use response.user.username
        if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('username', this.username || this.user?.username || '');  
        sessionStorage.setItem('email', this.email || this.user?.email || '');
        sessionStorage.setItem('phone', this.user.phone || response.user?.phone || '');
        sessionStorage.setItem('userId', this.user.userId ? this.user.userId.toString() : this.user?.userId?.toString() || '');
        }
        else{
          console.log("SessionStorage is not defined");
        }
        Swal.fire({
          title: 'Login successful.',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/home-page']);
          }
        });
      },
      error => {
        console.error('Login failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your email or password is incorrect!',
        });
      }
    );
    
  }

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  togglePasswordVisibility(input: any): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordVisible = input.type === 'text' && input.name === 'password';
    this.confirmPasswordVisible = input.type === 'text' && input.name === 'confirmPassword';
  }
}
