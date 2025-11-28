import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AddBillingService } from 'src/app/core/service/doctors/add-billing/add-billing.service';

@Component({
  selector: 'app-add-billing',
  templateUrl: './add-billing.component.html',
  styleUrls: ['./add-billing.component.css']
})
export class AddBillingComponent implements OnInit {
  submitted = false;
  AddBilling!: FormGroup;
  values: any
  num = 4;
  constructor(
    private fb: FormBuilder,
    private service: AddBillingService,
    private route: Router,

  ) { }

  ngOnInit(): void {
    this.AddBilling = this.fb.group({
      billing: this.fb.array([this.createBillFormGroup()])
    })
  }
  createBillFormGroup() {
    return this.fb.group({
      text3: [null, Validators.required],
      text4: [null, Validators.required]
    })
  }

  get billing(): FormArray {
    return this.AddBilling.get('billing') as FormArray;
  }
  get f() {
    return this.AddBilling.controls
  }

  addBilling() {
    this.billing.push(this.createBillFormGroup())
  }
  deleteBilling(i: number) {
    if (this.billing.length == 1) {
    }
    else {
      if (this.billing.length > 1) {
        this.billing.removeAt(i)
      }
    }
  }
  save() {
    this.submitted = true;
    if (this.billing.invalid) {
      return
    }
    else {
      // this.service.createAddbilling(this.AddBilling.value).subscribe(res=>{
      // this.toastr.showSuccess(res.data);
      localStorage.setItem('billActive', JSON.stringify(this.num))
      this.route.navigate(['/doctors/patientsprofile'])
      // })
    }
  }
  getBilling() {
    this.service.getAddbilling().subscribe(res => {
      this.values = res.data
    })
  }
  clear() {
    this.AddBilling.reset({})
  }
}
