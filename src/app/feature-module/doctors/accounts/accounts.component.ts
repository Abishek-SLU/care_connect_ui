import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
 submitted=false;
 AccountsDetails!:FormGroup;
  constructor( 
    private fb:FormBuilder,
    private rout:Router
    
    ) { }

  ngOnInit(): void {
  //   this.AccountsDetails=this.fb.group({
  //     BankName:[null,validators.required],
  //     BranchName:[null,validators.required],
  //     AccountNumber:[null,validators.required],
  //     AccountName:[null,validators.required]
  //   })
  }
  // get f(){
  //   return this.AccountsDetails.controls;
  // }

}
