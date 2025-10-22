import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  patientsList: any = [];
  errorMessage!: string;

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      lengthChange: false,
      info: false,
      
    }
    this.getPatients();
  }

  getPatients() {
    this.commonService.getpatients()
      .subscribe(
        {
          next:(res:any)=>{
            this.patientsList = res;
          },
          error:(err:any)=>{
            this.errorMessage = <any>err;
          }
          
        }
      )
  }

}
