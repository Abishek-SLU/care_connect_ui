import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private Http:HttpClient,
    private router:Router,
  ) { }
  private stateCreateUrl = environment.Api_url+'api/state/create';
  private stateGetUrl = environment.Api_url+'api/state/get';
  private stateEditUrl = environment.Api_url+'api/state/get';
  private stateUpdateUrl = environment.Api_url+'api/state/update';
  private stateDeleteUrl = environment.Api_url+'api/state/delete';
  private countryGetUrl = environment.Api_url + 'api/country/get'
  stateCreate(data:any){
    return this.Http.post<any>(this.stateCreateUrl,data)
    
  }
  stateGet(){
    return this.Http.get<any>(this.stateGetUrl);
  }
  stateEdit(id:any){
    return this.Http.get<any>(this.stateEditUrl+'/'+id);
  }
  stateUpdate(data:any){
    return this.Http.put<any>(this.stateUpdateUrl,data);
  }
  stateDelete(id:any){
    return this.Http.delete<any>(this.stateDeleteUrl+'/'+id);
  }
  countryGet() {
    return this.Http.get<any>(this.countryGetUrl);
  }
  
}
