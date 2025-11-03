import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private Http: HttpClient,
    private router: Router,
  ) { }
  ngOnInit(): void {

  }
  private countryCreateUrl = environment.Api_url + 'api/country/create'
  private countryGetUrl = environment.Api_url + 'api/country/get'
  private countryDeleteUrl = environment.Api_url + 'api/country/delete';
  private countryUpdateUrl = environment.Api_url+'api/country/update';
  private countryEditUrl = environment.Api_url+'api/country/get';

  countryCreate(data: any) {
    return this.Http.post<any>(this.countryCreateUrl, data);
  }
  countryGet() {
    return this.Http.get<any>(this.countryGetUrl);
  }
  countryDelete(id: any) {
    return this.Http.delete<any>(this.countryDeleteUrl + '/' + id);
  }
  countryUpdate(data:any){
    return this.Http.put<any>(this.countryUpdateUrl,data);
  }
  countryEdit(id:any){
    return this.Http.get<any>(this.countryEditUrl+'/' +id);
  }
}
