import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddprescriptionService {
  constructor(
    private Http: HttpClient,
    private router: Router
  ) { }
  private create = environment.Api_url + 'api/prescription/create'
  private update = environment.Api_url + 'api/prescription/update'
  private getbyId = environment.Api_url + 'api/prescription/getprescription'
  private get = environment.Api_url + 'api/doctor/patient-profile/prescription'
  private delete=environment.Api_url+ 'api/prescription/delete'
  private deleteID=environment.Api_url+ 'api/prescription/delprescription'
  
  createForm(data: any) {
    return this.Http.post<any>(this.create, data)
  }
  getForm(id:any) {
    return this.Http.get<any>(this.get+'/'+id)
  }
  updateForm(data: any) {
    return this.Http.put<any>(this.update,data)
  }
 GetFormid(id: string): Observable<any> {
  return this.Http.get<any>(this.getbyId + '/' + id)
 }
 deleteId(id:any){
  return this.Http.delete<any>(this.delete + '/' + id)
 }
 deleteGet(id :any){
  return this.Http.delete<any>(this.deleteID+ '/' + id)
 }

}
