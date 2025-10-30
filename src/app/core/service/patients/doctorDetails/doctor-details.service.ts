import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorDetailsService {

  constructor(
    private http:HttpClient
  ) { }
  private baseUrl = environment.Api_url;
  private doctorGetById = this.baseUrl+"api/doctor/get";
  private postFav = this.baseUrl+ "api/favourites/create";

  doctorget(id:any){
    return this.http.get<any>(this.doctorGetById + "/" + id)
  }
  
  favouritesPost(data:any){
    return this.http.post<any>(this.postFav,data)
  }

}
