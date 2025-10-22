import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/service/service.index';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isPatient: boolean = false;
  pass: boolean = true;
  showPassword: boolean = false;
  submitted=false;
  Login!:FormGroup;
  doctors: any = [];
  patients: any = [];
  userName = '';
  password = '';
  value: any;
  
  userRoleId:any
  constructor(
    public router: Router,
    public service: CommonService,
    private toastr: ToastrService,
    private fb:FormBuilder,

  ) {
    this.userName = '';
    this.password = '';
    this.doctors = [];
    this.patients = [];
  }

  ngOnInit(): void {
    localStorage.clear();
    this.Login=this.fb.group({
      userName:[null,[Validators.required]],
      password:[null,Validators.required]
    })
 
  }
  get f(){
    return this.Login.controls;
  }
  

  checkType(event:any) {
    this.isPatient = event.target.checked ? true : false;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.submitted=true;
    if(this.Login.invalid){
      this.toastr.error('', 'Login failed!');
      return;
    }else{
      console.log(this.Login.value);
      
      this.service.login_Url(this.Login.value).subscribe(res=>{
        let token = res.data.jwt;
        localStorage.setItem("token",token);
        this.router.navigate(["/patients/dashboard"]);
        let userId = res.data.roleName;
        localStorage.setItem("roleName",userId)
        if(userId === "DOCTOR"){
          this.router.navigate(["/doctors/dashboard"]);
          this.toastr.success(res.data.message);
        }else if(userId === "PATIENT"){
          this.router.navigate(["/patients/dashboard"]);
          this.toastr.success(res.data.message);
        }
      },err=>{
        this.toastr.error(err.error.error.message);  
      })
    }


  }
  mobileNumberValidator(control: FormControl) {
    const value = control.value;
    if (value && value.toString().length !== 10) {
      return { invalidMobileNumber: true };
    }
    return null;
  }
  onInput(event: any) {
    // Get the input value and remove any non-numeric characters
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
  
    // Update the input field with the numeric value
    event.target.value = numericValue;
  
    // Update the form control value
    this.Login.controls['userName'].setValue(numericValue);
  }
  
}


