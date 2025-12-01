import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = environment.Api_url;
  private summaryUrl = this.baseUrl + 'api/doctor/dashboard/summary';
  private todayUrl = this.baseUrl + 'api/doctor/dashboard/today';
  private upcomingUrl = this.baseUrl + 'api/doctor/dashboard/upcoming';
  private cancelledUrl = this.baseUrl + 'api/doctor/dashboard/cancelled';
  private updateAccept = this.baseUrl + 'api/appoinment/update';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getSummary(doctorId: string) {
    return this.http.get<any>(`${this.summaryUrl}/${doctorId}`);
  }

  getToday(doctorId: string) {
    return this.http.get<any>(`${this.todayUrl}/${doctorId}`);
  }

  getUpcoming(doctorId: string) {
    return this.http.get<any>(`${this.upcomingUrl}/${doctorId}`);
  }

  getCancel(doctorId: string) {
    return this.http.get<any>(`${this.cancelledUrl}/${doctorId}`);
  }

  getAcceptApp(data: any) {
    return this.http.patch<any>(this.updateAccept, data);
  }

  getDoctorDetails(id: any) {
    return this.http.get<any>(this.baseUrl + 'api/doctor/get-doctor/' + id);
  }

  getPatientDetails(id: any) {
    return this.http.get<any>(this.baseUrl + 'api/patient/get-patient/' + id);
  }

  getDoctorDetailsByUserId(id: any) {
    return this.http.get<any>(this.baseUrl + 'api/doctor/get/' + id);
  }

  getPatientDetailsByUserId(id: any) {
    return this.http.get<any>(this.baseUrl + 'api/patient/get/' + id);
  }
}