import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PatientprescriptionService {

  private baseUrl = environment.Api_url;
  private getprescription = this.baseUrl + "api/Patient/dashboard/prescriptionList";
  private prescriptionId = this.baseUrl + "api/Patient/dashboard/prescriptionGet";
  constructor(private http:HttpClient) { }

  prescriptionGet(){
    return this.http.get<any>(this.getprescription)
  }
  prescriptionView(id:any){
    return this.http.get<any>(this.prescriptionId + "/" +id)
  }
}
