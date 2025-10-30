import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyPatientsService {

  constructor(
    private http:HttpClient,
  
  ) { }
  private get=environment.Api_url+'api/doctor/dashboard/mypatients'
  private getcomplete=environment.Api_url+'api/doctor/dashboard/mypatientscompleted'
  
  getForm(){
    return this.http.get<any>(this.get)
  }
 getCompleted(){
  return this.http.get<any>(this.getcomplete)
 }
}
