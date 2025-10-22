import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  splitVal: any;
  url: any;
  base = 'Invoice';
  page = 'List';
  invoices : any = [];
  constructor(public commonService:CommonService,private router: Router ) { }

  ngOnInit(): void {
  	this.getTransactions();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });
  }

  getTransactions() {
  	this.commonService.getTransactions()
  		.subscribe(res=>{
  			this.invoices = res;
  		})
  }
}
