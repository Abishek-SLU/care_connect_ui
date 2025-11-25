import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/core/service/patients/new-patient/patient.service';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  closeOtpPopup() {
    this.showOtpPopup = false;
  }

  showPassword = false;
  showOtpPopup = false;
  otpNumber = '';
  isOtpNumberValid = false;
  validation = false;
  showChangePassword = false;
  patientRegisterForm!: FormGroup;
  linkName = 'Are you a Doctor?';
  headName = 'Patient Register';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    public service: CommonService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.patientRegisterForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      userName: [null],
      password: [null],
      fullName: [null],
      userRoleId: '8a75f7bf-09e2-4e6f-bd1f-731cc6c4f120'
    });
  }

  get f() {
    return this.patientRegisterForm.controls;
  }

  onSignupClick() {
    this.validation = true;
    if (!this.patientRegisterForm.value.name || !this.patientRegisterForm.value.email) {
      this.toastr.error('Please enter Name and Email');
      return;
    }

    this.service.generateOTP(this.patientRegisterForm.value).subscribe(
      () => {
        this.toastr.success('OTP sent successfully to your email');
        this.showOtpPopup = true;
      },
      (err) => {
        this.toastr.error(err.error?.error?.reason || 'Failed to send OTP');
      }
    );
  }

  verifyOTP() {
    if (!this.isOtpNumberValid) {
      this.toastr.error('Please enter a valid 4-digit OTP');
      return;
    }

    this.service.verifyOtp({
      email: this.patientRegisterForm.value.email,
      otp: this.otpNumber
    }).subscribe(
      () => {
        this.toastr.success('OTP verified successfully!');
        this.showOtpPopup = false;
        this.showChangePassword = true;
      },
      (err) => {
        this.toastr.error(err.error?.error?.reason || 'Invalid OTP');
      }
    );
  }

  userRegisterUpdate() {
    this.validation = true;
    if (!this.patientRegisterForm.value.userName || !this.patientRegisterForm.value.password) {
      this.toastr.error('Please enter Username and Password');
      return;
    }

    this.patientRegisterForm.value.fullName = this.patientRegisterForm.value.name;


    this.service.userRegisterUpdate(this.patientRegisterForm.value).subscribe(
      (res: any) => {
        this.toastr.success('Account created successfully!');

        this.router.navigate(["/login"]);
      },
      (err) => {
        this.toastr.error(err.error?.error?.reason || 'Registration update failed');
      }
    );
  }

  onOTPInput(event: any) {
    const value = event.target.value.replace(/\D/g, '').substring(0, 4);
    this.otpNumber = value;
    this.isOtpNumberValid = /^\d{4}$/.test(value);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  doctorRegister() {
    this.patientRegisterForm.patchValue({
      userRoleId: this.linkName === 'Are you a Doctor?'
        ? 'bab17134-9327-43b5-afbf-20efa5e0647d'
        : '8a75f7bf-09e2-4e6f-bd1f-731cc6c4f120'
    });
    this.linkName = this.linkName === 'Are you a Doctor?' ? 'Are you a Patient?' : 'Are you a Doctor?';
    this.headName = this.headName === 'Doctor Register' ? 'Patient Register' : 'Doctor Register';

  }
}