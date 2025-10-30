import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  profileData$: any;
  get(arg0: string) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = environment.Api_url;
  private createPatient = this.baseUrl + "api/patient/create";
  private getPatient= this.baseUrl+"api/patient/get";
  private updatePatient = this.baseUrl+"api/patient/update";
  private deletePatient = this.baseUrl+"api/patient/delete";
  private stateGetUrl = this.baseUrl+'api/state/get';
  private countryGetUrl = this.baseUrl + 'api/country/get';
  private distGetUrl = this.baseUrl  + 'api/district/get';
  private  bloodgroupGetUrl = this.baseUrl+'api/bloodgroup/get';
  private getProfile = this.baseUrl + 'api/patient/get/profile';
  private createImg = this.baseUrl +'api/patient/updateImage';
  private deleteImg = this.baseUrl + 'api/patient/patientImagedelete';
  private stateCountryUrl = this.baseUrl + 'api/countrystate/state';
  private stateCountryDistUrl = this.baseUrl + 'api/countrystate/district';
  constructor(private http : HttpClient) { }
profileGet(id:any){
  return this.http.get(this.getProfile + "/" +id);
}
  patientCreate(data:any){
    return this.http.post<any>(this.createPatient,data);
  }
  patientGet(id:any){
    return this.http.get(this.getPatient+"/"+id);
  }
  patientUpdate(data:any){
    return this.http.put<any>(this.updatePatient,data);
  }
  patietDelete(){
    return this.http.delete(this.deletePatient);
  }
  countryGet() {
    return this.http.get<any>(this.countryGetUrl);
  }
  stateGet(){
    return this.http.get<any>(this.stateGetUrl);
  }
  distGet() {
    return this.http.get<any>(this.distGetUrl);
  }
  bloodgroupGet(){
    return this.http.get<any>(this.bloodgroupGetUrl);
  }
  imgCreate(formData: FormData): Observable<any> {
    return this.http.put(this.createImg, formData);
  }
  imgDelet(id: any) {
    return this.http.delete(this.deleteImg  + '/' + id);
  }
  stateContryGet(id:any) {
    return this.http.get<any>(this.stateCountryUrl + '/'+id);
  }
  
  CountryDistGet(id:any) {
    return this.http.get<any>(this.stateCountryDistUrl + '/'+id);
  }

}