import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {


  constructor(
    private Http: HttpClient,
    private router: Router
  ) { }
  private distcreateUrl = environment.Api_url + 'api/district/create';
  private distGetUrl = environment.Api_url + 'api/district/get';
  private distEditUrl = environment.Api_url + 'api/district/get';
  private distUpdateUrl = environment.Api_url + 'api/district/update';
  private distDeleteUrl = environment.Api_url + 'api/district/delete';
  private stateGetallUrl = environment.Api_url + 'api/countrystate/state';
  private countryGetUrl = environment.Api_url + 'api/country/get'
private districtGetallUrl = environment.Api_url + '/api/countrystate/district'
   distCreate(data: any) {
    return this.Http.post<any>(this.distcreateUrl, data);
  }
  distGet() {
    return this.Http.get<any>(this.distGetUrl);
  }
  distEdit(id: any) {
    return this.Http.get<any>(this.distEditUrl + '/' + id);
  }
  distUpdate(data: any) {
    return this.Http.put<any>(this.distUpdateUrl, data);
  }
  distDelete(id: any) {
    return this.Http.delete<any>(this.distDeleteUrl + '/' + id);
  }
  countryGet() {
    return this.Http.get<any>(this.countryGetUrl);
  }
  stateGetAll(id:any) {
    return this.Http.get<any>(this.stateGetallUrl + '/' + id);
  }
  districtGetAll(id:any){
    return this.Http.get<any>(this.districtGetallUrl + '/' + id);
  }
}
