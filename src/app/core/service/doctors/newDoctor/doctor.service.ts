import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private base_url = environment.Api_url;
  private createDoctor = this.base_url + "api/doctor/create";
  private getDoctor= this.base_url+"api/doctor/get";
  private updateDoctor = this.base_url+"api/doctor/update";
  private deleteDoctor = this.base_url+"api/doctor/delete";

  constructor(private http : HttpClient) { }

  doctorCreate(data:any){
    return this.http.post<any>(this.createDoctor,data);
  }
  doctorGet(){
    return this.http.get(this.getDoctor);
  }
  doctorUpdate(data:any){
    return this.http.put<any>(this.updateDoctor,data);
  }
  doctorDelete(){
    return this.http.delete(this.deleteDoctor);
  }
}
