import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-billing',
  templateUrl: './edit-billing.component.html',
  styleUrls: ['./edit-billing.component.css']
})
export class EditBillingComponent implements OnInit {

  constructor() { }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-billing',
  templateUrl: './edit-billing.component.html',
  styleUrls: ['./edit-billing.component.css']
})
export class EditBillingComponent implements OnInit {
billing!:FormGroup;
submitted=false;
  constructor(
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.billing=this.fb.group({
      title1:[null,Validators.required],
      amount:[null,Validators.required]
    })
  }
  get f(){
    return this.billing.controls
  }

}

  ngOnInit(): void {
  }

}
