import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocProfileSettingService {
  private base_url = environment.Api_url;
  private createDoctorProfile = this.base_url + 'api/doctor/create';
  private deleteDoctorProfile = this.base_url + 'api/doctor/delete';
  private getDoctorProfile = this.base_url + 'api/doctor/get';
  private updateDoctorProfile = this.base_url + 'api/doctor/update';
  // private  basicDetls = this.base_url + 'api/doctor/create';

  //------------clinic
  
  private clinicDetls = this.base_url + 'api/doctor/createClinic'
  
//--------update----------//
  private updateBasic = this.base_url + 'api/doctor/updatedoctor';
  
  private updateClinic = this.base_url + 'api/doctor/updateClinic';
  
private updateservice= this.base_url + 'api/doctor/updatedoctordetails';

  private updateDoctorClinic=this.base_url+'api/doctor/updatedoctorclinic'
// api/doctor/updatedoctordetails
//-------profile pic  -----//
private createImg = this.base_url + 'api/doctor/updateImage';
  private getImg = this.base_url + 'api/doctor/getimage';
  private deleteImg = this.base_url + 'api/doctors/doctorImagedelete';
  
  //--------------- delete -----------//

  private clinicDel = this.base_url + 'api/doctors/clinicdelete';
  private awardDel = this.base_url + 'api/doctors/awardsdelete';
  private educationDel = this.base_url + 'api/doctors/educationdelete';
  private experinceDel = this.base_url + 'api/doctors/experiencedelete';
  private memberDel = this.base_url + 'api/doctors/membershipdelete';
  private serviceDel = this.base_url + 'api/doctors/servicedelete';
  private specialDel = this.base_url + 'api/doctors/specializationdelete';
  //--------------- delete -----------//
  private doctorGet = this.base_url + "api/doctor/get";
  private locationSer = this.base_url + "api/doctor/search/name";
  

  private stateGetUrl = this.base_url + 'api/state/get';
  private countryGetUrl = this.base_url + 'api/country/get';
  private distGetUrl = this.base_url + 'api/district/get';
  private stateCountryUrl = this.base_url + 'api/countrystate/state';
  private stateCountryDistUrl = this.base_url + 'api/countrystate/district';

  constructor(private http: HttpClient) {}
  

  // imgCreate(data: any) {
  //   return this.http.post<any>(this.createImg, data);
  // }
  imgCreate(formData: FormData): Observable<any> {
    return this.http.put(this.createImg, formData);
  }
  profileGet(id: any) {
    return this.http.get(this.getImg + '/' + id);
  }
  imgDelet(id: any) {
    return this.http.delete(this.deleteImg  + '/' + id);
  }
  //-------clinic---
  clinicCreate(data: any) {
    return this.http.post<any>(this.clinicDetls, data);
  }


  doctorProfileCreate(data: any) {
    return this.http.post<any>(this.createDoctorProfile, data);
  }
  doctorProfileDelete() {
    return this.http.delete(this.deleteDoctorProfile);
  }
  doctorProfileGet() {
    return this.http.get(this.getDoctorProfile);
  }
  doctorProfileGetById(id: any) {
    return this.http.get(this.getDoctorProfile + '/' + id);
  }

  //--------------update-------------

  basicUpdate(data: any) {
    return this.http.put<any>(this.updateBasic, data);
  }
  clinicUpdate(formData: FormData): Observable<any> {
    return this.http.put(this.updateClinic, formData);
  }
  serviceUpdate(data: any) {
    return this.http.put<any>(this.updateservice, data);
  }
  clinicDoctUpdate(data: any) {
   return this.http.put<any>(this.updateDoctorClinic,data)
 }
  //------------- detete  ------//
  deleteSer(id: any) {
    return this.http.delete(this.serviceDel + '/' + id);
  }
  deleteEduca(id: any) {
    return this.http.delete(this.educationDel + '/' + id);
  }
  deleteSpecial(id: any) {
    return this.http.delete(this.specialDel + '/' + id);
  }
  deleteClinic(id: any) {
    return this.http.delete(this.clinicDel + '/' + id);
  }
  deleteMember(id: any) {
    return this.http.delete(this.memberDel + '/' + id);
  }
  deleteaward(id: any) {
    return this.http.delete(this.awardDel + '/' + id);
  }
  deleteExpre(id: any) {
    return this.http.delete(this.experinceDel + '/' + id);
  }
  
  //------------- detete  ------//

  getDoctor(){
    return this.http.get<any>(this.doctorGet)
  }

  countryGet() {
    return this.http.get<any>(this.countryGetUrl);
  }
  stateGet() {
    return this.http.get<any>(this.stateGetUrl);
  }
  cityGet() {
    return this.http.get<any>(this.distGetUrl);
  }
  location(obj:any) {
    return this.http.get<any>(this.locationSer,{params:obj})
  }
  stateContryGet(id:any) {
    return this.http.get<any>(this.stateCountryUrl + '/'+id);
  }
  
  CountryDistGet(id:any) {
    return this.http.get<any>(this.stateCountryDistUrl + '/'+id);
  }
}
