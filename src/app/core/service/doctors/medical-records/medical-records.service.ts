import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordsService {

  constructor(
    private Http:HttpClient,
  ) { }
  private getMed=environment.Api_url+'api/doctor/patient-profile/medicalrecords'
  private create = environment.Api_url+'api/doctormedicalrecords/create'
  private getId=environment.Api_url+'api/patient/get'
  private delete=environment.Api_url+'api/doctormedicalrecords/delete'
  private download=environment.Api_url+'api/doctormedicalrecords/download'
  
  getMedicalrecords(id:any){
    return this.Http.get<any>(this.getMed + '/' + id);
  }
  createMedicalrecords(formData: FormData): Observable<any>{
    return this.Http.post<any>(this.create,formData)
  }
 
  medicalDelete(id:any){
    return this.Http.delete<any>(this.delete + "/" + id)
  }
  getIdForm(id:any){
    return this.Http.get<any>(this.getId + '/' + id);
  }
  downloadFile(id: string): Observable<Blob> {
    return this.Http.get(this.download + "/" + id, { responseType: 'blob' });
  }
}
