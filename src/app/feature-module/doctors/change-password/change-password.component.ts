import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  validation = false;
  loading = false;
  passwordMismatch = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  onSubmit() {
    this.validation = true;
    this.passwordMismatch = false;

    if (this.changePasswordForm.invalid) {
      this.toastr.error('Please fill in all required fields.', 'Validation Error');
      return;
    }

    const oldPassword = this.changePasswordForm.value.oldPassword;
    const newPassword = this.changePasswordForm.value.newPassword;
    const confirmPassword = this.changePasswordForm.value.confirmPassword;

    if (newPassword !== confirmPassword) {
      this.passwordMismatch = true;
      this.toastr.error('New password and confirm password must match', 'Validation Error');
      return;
    }

    const payload = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };

    this.loading = true;
    this.spinner.show();
    this.commonService.changePassword(payload).subscribe(
      res => {
        this.spinner.hide();
        this.loading = false;
        this.toastr.success(res.data ? res.data : 'Password changed successfully');
        this.changePasswordForm.reset({});
        this.validation = false;
      },
      err => {
        this.spinner.hide();
        this.loading = false;
        const msg =
          err && err.error && err.error.error && err.error.error.reason
            ? err.error.error.reason
            : 'Failed to change password';
        this.toastr.error(msg);
      }
    );
  }
}