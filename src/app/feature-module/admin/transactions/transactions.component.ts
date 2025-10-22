import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  transactionsList: any = [];
  errorMessage!: string;
  id:any;
  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.getTransactions();
    this.dtOptions = {
      searching: false,
      lengthChange: false,
      info: false,
      
    }
  }

  deleteModal(template: TemplateRef<any>, trans:any) {
    this.id = trans.id;
  }

  deleteTrans() {
    this.transactionsList = this.transactionsList.filter((a:any) => a.id !== this.id);
    // this.modalRef.hide();
    // this.commonService.deleteTransaction(this.id).subscribe((data : any[])=>{      
    //   this.getTransactions();
    // });
  }

  decline() {
    // this.modalRef.hide();
  }
  getTransactions() {
    this.commonService.getTransactions()
      .subscribe(res => {
        this.transactionsList = res;
      },
        error => this.errorMessage = <any>error);
  }
}
