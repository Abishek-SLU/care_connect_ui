import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SearchDoctorService {
  constructor(
    private http:HttpClient
  ) { }
    private baseUrl = environment.Api_url;
    private doctorGet = this.baseUrl + "api/doctor/get";
    private postFav = this.baseUrl+ "api/favourites/create";
    private delFav = this.baseUrl + "api/favourites/delete";
    private filterDoctor = this.baseUrl + "api/doctors/search/filter";
    // private postFav = this.baseUrl + "api/favourites/create"
    private favDoctorGet = this.baseUrl + "api/favourites/get";

    getDoctor(){
      return this.http.get<any>(this.doctorGet)
    }

    favouritesPost(data:any){
      return this.http.post<any>(this.postFav,data)
    }
    
    searchGet(obj:any){
      return this.http.get<any>(this.filterDoctor,{params:obj})
  }

  favDocGet(){
    return this.http.get<any>(this.favDoctorGet);
  }
    unFavourites(id:any){
      return this.http.delete<any>(this.delFav + "/" +id)
    }
}
