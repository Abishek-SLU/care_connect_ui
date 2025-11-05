import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/service/service.index';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from 'src/app/core/service/patients/new-patient/patient.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  showPassword: boolean = false;

  isMobileNumberVerified: boolean = false;
  isOTPVerified: boolean = false;
  MobileNumber!: string;
  showOTPInput: boolean = false;
  showChangePassword: boolean = false;
  otp!: string;
  patientRegisterForm !: FormGroup;
  validation = false;
  Name = '';
  mobile = '';
  password = '';
  name: string = '';
  mobileNumber: string = '';
  otpNumber: string = '';
  isMobileNumberValid: boolean = false;
  isOtpNumberValid: boolean = false;
  isPatient: boolean = true;
  doctors: any = [];
  patients: any = [];
  reg_type = 'Patient Register';
  doc_patient = 'Are you a Doctor?';
  value: any;
  isReadOnly = false;
  submitRead = true;
  otpReadOnly = false;
  otpSubmit = true;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public commonService: CommonService,
    public router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.patientRegisterForm = this.fb.group({
      name: [null, Validators.required],
      mobileNo: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      otp: [null, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      userName: [null, Validators.required],
      password: [null, [Validators.required, this.passwordStrengthValidator]],
      roleId: "e51be7af-0f1a-4c45-a9f0-83288b183119"

    })
    // this.getpatients();
    // this.getDoctors();
    if ($('.floating').length > 0) {
      $('.floating').on('focus blur', (e: { type: string; }) => {
        $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value > 0));
      }).trigger('blur');
    }
  }

  get f() {
    return this.patientRegisterForm.controls;
  }

  changeRegType() {
    if (this.reg_type === 'Doctor Register') {
      this.reg_type = 'Patient Register';
      this.doc_patient = 'Are you a Doctor?';
      this.isPatient = true;
    } else {
      this.reg_type = 'Doctor Register';
      this.doc_patient = 'Not a Doctor?';
      this.isPatient = false;
    }
  }


 

 
  onMobileNumberChange(event: any) {
    const input = event.target;
    const value = input.value.replace(/\D/g, '').substring(0, 10);
    this.isMobileNumberValid = /^\d{10}$/.test(value);
    this.patientRegisterForm.patchValue({ mobileNo: value });
  }

  onOTPInput(event: any) {
    const input = event.target;
    const value = input.value.replace(/\D/g, '').substring(0, 6); // Restrict to 6 digits
    this.isOtpNumberValid = /^\d{6}$/.test(value);
    this.patientRegisterForm.patchValue({ otp: value });
    this.otp = value; // Update the value in your component
  }


  passwordStrengthValidator(control: any) {
    const value = control.value;
    if (!value) {
      return null;
    }
    // Define your strong password criteria here
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()\-=_+[\]{}|;':",.<>?/\\]/.test(value);
    const isLengthValid = value.length >= 8;

    const isValid = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && isLengthValid;
    return isValid ? null : { passwordStrength: true };
  }
  signup() {
    this.validation = true;
    if (this.patientRegisterForm.invalid) {
      // Show Toastr message indicating validation error
      this.toastr.error('Please fill in all required fields.', 'Validation Error');
      return;
    } else {
      this.patientService.patientCreate(this.patientRegisterForm.value).subscribe(res => {
        console.log(res);
        let token = localStorage.setItem('token', res.jwt);
        this.toastr.success('', 'Register successfully!');
        setTimeout(() => {
          this.router.navigate(['/patients/profilesetting']);

        })
      }, err => {
        this.toastr.error(err.error.error.reason);

      })
    }

  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}