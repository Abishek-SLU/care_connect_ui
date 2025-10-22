import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  appointments : any = [];
  patients :  any = [];
  
  constructor(public commonService:CommonService) { }

  ngOnInit(): void {
    this.getPatients();
    this.getAppointments();

  }

  getAppointments() {
    this.commonService.getAppointments()
      .subscribe(res=>{
        this.appointments = res;
        let scope = this;
        this.appointments.forEach((index:any)=>{
          let filter = scope.patients.filter((a:any)=>a.key === index.patient_key);
          if(filter.length != 0) {
            index['patients'] = filter[0];
          }
        })
        this.appointments = this.appointments.filter((a:any)=>a.status === 'accept');
      })
  }

  getPatients() {
    this.commonService.getpatients()
    .subscribe(res=>{
      this.patients = res;
    })
  }

}
