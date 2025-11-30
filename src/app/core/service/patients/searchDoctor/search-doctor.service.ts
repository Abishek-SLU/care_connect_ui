import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchDoctorService {
  private baseUrl = environment.Api_url;
  private doctorGet = this.baseUrl + 'api/doctor/get';
  private postFav = this.baseUrl + 'api/favourites/create';
  private delFav = this.baseUrl + 'api/favourites/delete';
  private filterDoctor = this.baseUrl + 'api/doctors/search/filter';
  private favDoctorGet = this.baseUrl + 'api/favourites/get';

  private doctorSearchAll = this.baseUrl + 'api/doctor-search/all';
  private doctorSearch = this.baseUrl + 'api/doctor-search/search';

  constructor(private http: HttpClient) { }

  getDoctor(): Observable<any> {
    return this.http.get<any>(this.doctorGet);
  }

  favouritesPost(data: any): Observable<any> {
    return this.http.post<any>(this.postFav, data);
  }

  searchGet(obj: any): Observable<any> {
    return this.http.get<any>(this.filterDoctor, { params: obj });
  }

  favDocGet(): Observable<any> {
    return this.http.get<any>(this.favDoctorGet);
  }

  unFavourites(id: any): Observable<any> {
    return this.http.delete<any>(this.delFav + '/' + id);
  }

  getAllSearchDoctors(): Observable<any> {
    return this.http.get<any>(this.doctorSearchAll);
  }

  searchDoctors(body: any): Observable<any> {
    return this.http.post<any>(this.doctorSearch, body);
  }
}