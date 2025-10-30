import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private getall=environment.Api_url+"api/doctor/dashboard/get";
  private getCancelledAppointment=environment.Api_url+"api/doctor/dashboard/cancelled"
  private getDocid=environment.Api_url+"api/doctor/dashboard/docinfo"
  private doctorImage=environment.Api_url+"api/doctor/dashboard/getdoctorimage"
  // private getAppointment=environment.Api_url+"api/doctor/dashboard/appointments"
  private updateAccept=environment.Api_url+"api/appoinment/update"
  
  constructor(
    private Http: HttpClient,
    private router: Router
  ) { }

  
  
  getForm(){
    
    return this.Http.get<any>(this.getall)
  }
  getDoctorid(){
  return this.Http.get<any>(this.getDocid)
  }
  getAcceptApp(data:any){
    return this.Http.patch(this.updateAccept,data)
  }
  getCancel(){
    return this.Http.get<any>(this.getCancelledAppointment)
  }
  // getAppointments(id:any){
  //   return this.Http.get<any>(this.getAppointment+'/'+id)
  // }
getImage(){
  return this.Http.get<any>(this.doctorImage)
}

}
