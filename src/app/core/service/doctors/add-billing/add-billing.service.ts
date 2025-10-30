import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddBillingService {

  constructor(
    private Http:HttpClient,
  ) { }
  private get=environment.Api_url+''
  private create=environment.Api_url+''
  private update=environment.Api_url+''
  private delete=environment.Api_url+''

  getAddbilling(){
    return this.Http.get<any>(this.get)
  }
  createAddbilling(data:any){
    return this.Http.post<any>(this.create,data)
  }
  updateAddbilling(data:any){
    return this.Http.put<any>(this.update,data)
  }
  deleteAddbilling(id:any){
    return this.Http.delete<any>(this.delete+'/'+id)
  }
}
