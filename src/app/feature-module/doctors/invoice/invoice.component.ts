import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoices : any = [];
  constructor(public commonService:CommonService) { }

  ngOnInit(): void {
  	this.getTransactions();
  }

  getTransactions() {
  	this.commonService.getTransactions()
  		.subscribe(res=>{
  			this.invoices = res;
  		})
  }
}
