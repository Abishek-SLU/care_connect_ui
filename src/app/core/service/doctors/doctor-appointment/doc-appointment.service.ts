import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocAppointmentService {
      private getAppointment=environment.Api_url+'api/doctor/patient-profile/appointments'
      private getPatientInfo=environment.Api_url+'api/doctor/patient-profile/patientinfo'
      private getdocimage =environment.Api_url+'api/doctor/dashboard/getdoctorimage'
      
  constructor(
    private Http:HttpClient
  ) { }
  getApp(id:any){
    return this.Http.get<any>(this.getAppointment + '/' +id)
  }
  getPatient(id:any){
    return this.Http.get<any>(this.getPatientInfo + '/' + id)
  }
  getImage(){
    return this.Http.get<any>(this.getdocimage)
  }
}
