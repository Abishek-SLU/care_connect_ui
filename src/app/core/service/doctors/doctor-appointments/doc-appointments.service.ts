import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocAppointmentsService {
  private base_url = environment.Api_url;
  private getAppointments = this.base_url + "api/doctor/dashboard/appointments"
  private updateAppointments = this.base_url + "api/appoinment/update"
  private cancelSchedule = this.base_url + "api/appoinment/cancelAll"
  constructor(
    private http: HttpClient
  ) { }

  appGet() {
    return this.http.get<any>(this.getAppointments);
  }
  appUpdate(data: any) {
    return this.http.patch(this.updateAppointments, data);
  }
  appointmentCancell(id: any,data:any) {
    return this.http.put(this.cancelSchedule+'/'+id, data);
  }
}
