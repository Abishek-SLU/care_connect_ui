import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicaldetailsService {
  private baseUrl = environment.Api_url;
  private create = this.baseUrl + 'api/medical-detail/create';
  private getAll = this.baseUrl + 'api/medical-detail/list';
  private getById = this.baseUrl + 'api/medical-detail/get';
  private update = this.baseUrl + 'api/medical-detail/update';
  private deleteUrl = this.baseUrl + 'api/medical-detail/delete';

  constructor(private http: HttpClient) { }

  medicalDetailsCreate(data: any) {
    return this.http.post<any>(this.create, data);
  }

  medicalDetailsGet(id: any) {
    return this.http.get<any>(this.getAll + '/' + id);
  }

  medicalDetailsGetById(id: any) {
    return this.http.get<any>(this.getById + '/' + id);
  }

  medicalDetailsUpdate(data: any) {
    return this.http.put<any>(this.update, data);
  }

  medicalDetailsdelete(id: any) {
    return this.http.delete<any>(this.deleteUrl + '/' + id);
  }
}