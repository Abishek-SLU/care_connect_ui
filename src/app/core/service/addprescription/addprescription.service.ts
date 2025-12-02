import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddprescriptionService {
  private baseUrl = environment.Api_url;
  private createUrl = this.baseUrl + 'api/prescription/create';
  private updateUrl = this.baseUrl + 'api/prescription/update';
  private deleteUrl = this.baseUrl + 'api/prescription/delete/';
  private getByPatientUrl = this.baseUrl + 'api/prescription/get-patient/';
  private getByIdUrl = this.baseUrl + 'api/prescription/get-prescription/';

  constructor(private http: HttpClient) { }

  create(data: any) {
    return this.http.post<any>(this.createUrl, data);
  }

  update(data: any) {
    return this.http.put<any>(this.updateUrl, data);
  }

  deleteId(id: any) {
    return this.http.delete<any>(this.deleteUrl + id);
  }

  getByPatient(patientId: any) {
    return this.http.get<any>(this.getByPatientUrl + patientId);
  }
  getById(prescriptionId: any) {
    return this.http.get<any>(this.getByIdUrl + prescriptionId);
  }
}