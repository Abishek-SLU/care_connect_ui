import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalrecordsService {

  private baseUrl = environment.Api_url;
  private create = this.baseUrl + "api/medicalrecords/create";
  private getAll = this.baseUrl + "api/medicalrecords/getAll";
  private delete = this.baseUrl + "api/medicalrecords/delete";
  private download = this.baseUrl + "api/medicalrecords/download";


  constructor(private http : HttpClient) { }

  medicalCreate(formData: FormData): Observable<any> {
    return this.http.post(this.create, formData);
  }

  medicalGet(){
    return this.http.get<any>(this.getAll)
  }
  medicalGetId(id:any){
    return this.http.get<any>(this.getAll+"/"+id)
  }
  medicalDelete(id:any){
    return this.http.delete<any>(this.delete + "/" + id)
  }
  downloadFile(id: string): Observable<Blob> {
    return this.http.get(this.download + "/" + id, { responseType: 'blob' });
  }
}
