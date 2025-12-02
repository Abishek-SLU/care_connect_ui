import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyPatientsService {
  private baseUrl = environment.Api_url;
  constructor(
    private http: HttpClient,

  ) { }
  private get = environment.Api_url + 'api/doctor/dashboard/mypatients'
  private getcomplete = environment.Api_url + 'api/doctor/dashboard/mypatientscompleted'

  getForm() {
    return this.http.get<any>(this.get)
  }
  getCompleted() {
    return this.http.get<any>(this.getcomplete)
  }

  getAppointmentsByDoctor(doctorId: string) {
    return this.http.get<any>(
      this.baseUrl + 'api/appoinment/doctor/' + doctorId
    );
  }

  getPatientDetails(patientId: string) {
    return this.http.get<any>(
      this.baseUrl + 'api/patient/get-patient/' + patientId
    );
  }
}
