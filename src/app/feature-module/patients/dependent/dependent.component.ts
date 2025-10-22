import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-dependent',
  templateUrl: './dependent.component.html',
  styleUrls: ['./dependent.component.css']
})
export class DependentComponent implements OnInit {
  dependentForm!:FormGroup
  validation=false;
  constructor(
    private grp:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.dependentForm = this.grp.group({
      id: [null],
      name:[null,Validators.required],
      relationship:[null,Validators.required],
      bloodgroup:[null,Validators.required],
      gender:[null,Validators.required],
      dob:[null,Validators.required],
      status: 'Active'
    })
  }
get f(){
  return this.dependentForm.controls
}
savechanges(){
this.validation=true;
if(this.dependentForm.invalid){
  return
}
}
}
