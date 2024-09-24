import { Component, OnInit } from '@angular/core';
import { Email } from '../../entities/email';
import { User } from '../../entities/user';
import { OtpService } from '../../service/otp.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  forgotPasswordForm!: FormGroup; // Form group declaration without initialization

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private otpService: OtpService,
    private userservice: UserService
  ) {}

  email: Email = new Email("", "", "");

  user: User = new User(0, '', '', '', '', '', '');

  otpSent = false;
  timer: any;
  timerValue = 150; // 5 minutes in seconds
  otp: any = null;
  enteredOtp: number = 0;

  ngOnInit(): void {
    // Initialize the form group inside ngOnInit()
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ]
    });
  }

  generateRandomOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  sendOtp(): void {
    this.userservice.findUserByEmail(this.forgotPasswordForm.get('email')?.value).subscribe((data: any) => {
      if (data != null) {
        this.user = data;
        this.otp = this.generateRandomOTP();
        this.otpSent = true;
        this.startTimer();
        this.email.setTo = this.forgotPasswordForm.get('email')?.value;
          this.email.setSubject = "Estate Ease OTP(One Time Password)";
        this.email.setText = "Dear valued user,\n\nThank you for choosing Estate Ease! Your one-time OTP (One-Time Password) for accessing our services is: " + this.otp + ". Please use this OTP to complete your transaction securely.\n\nIf you did not request this OTP, please ignore this message.\n\nHappy investing!\n\nSincerely,\nThe Estate Ease Team";

        this.otpService.sendOTP(this.email).subscribe((data: any) => {});
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Customer with this email not registered!!!',
        });
      }
    });
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.timerValue > 0) {
        this.timerValue--;
      } else {
        clearInterval(this.timer);
        this.timerValue = 150; // Reset timer value
        this.otp = null;
      }
    }, 1000);
  }

  resendOtp(): void {
    this.sendOtp();
  }

  resetPassword(): void {
    this.enteredOtp = this.forgotPasswordForm.get('otp')?.value;
    if (this.otp != this.enteredOtp) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong OTP!',
      });
    } else {
      this.user.password = this.forgotPasswordForm.get('password')?.value;
      this.userservice.updateUser(this.user.userId, this.user).subscribe((data: any) => {
        if (data != null) {
          Swal.fire({
            title: 'Your Password updated successfully.',
            icon: 'success',
            confirmButtonText: 'Okay'
          }).then(() => {
            this.router.navigate(['']);
          });
        }
      });
    }
  }
}
