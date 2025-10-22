import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
list : any = []
  patientId:any;
  appointments : any = [];
  patients :  any = [];
  appointmentId:any;
  constructor(public commonService:CommonService) { }

  ngOnInit(): void {
      
      this.getPatients();
      this.getAppointments();
		  this.list = this.commonService.getJSON();
		  this.list = this.list.filter((a:any)=>a.status === 0);
  }

  confirm(value:any) {
    delete this.appointmentId['patients']
    let data = {
      ...this.appointmentId
    }
    data['status'] = 'accept';
    this.commonService.updateAppointment(data,data.id)
      .subscribe(res=>{
        // this.modalRef.hide();
        this.appointments = this.appointments.filter((a:any)=>a.id != data.id);
        this.getPatients();
        this.getAppointments();
      });
   
  }

  
  decline() {
    delete this.appointmentId['patients']
    let data = {
      ...this.appointmentId
    }
    data['status'] = 'decline';
    this.commonService.updateAppointment(data,data.id)
      .subscribe(res=>{
        this.appointments = this.appointments.filter((a:any)=>a.id != data.id);
        this.getPatients();
        this.getAppointments();
      })
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
        this.appointments = this.appointments.filter((a:any)=>a.status === 'active');
      })
  }

  getPatients() {
    this.commonService.getpatients()
    .subscribe(res=>{
      this.patients = res;
    })
  }
}
