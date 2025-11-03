import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocScheduleTimingService {
  private base_url = environment.Api_url;
  private createAddSlot = this.base_url + "api/doctorschedule/create";
  private getDoctorClinicId = this.base_url + "api/doctorschedule/getclinic";
  private getSchedule = this.base_url + "api/doctorschedule/getBySlot";
  private deleteSchedule = this.base_url + "api/doctorschedule/delete";
  private updateSchedule = this.base_url + "api/doctorschedule/update";
  private getBySchedule = this.base_url + "api/doctorschedule/getByDay";
  private inactiveSchedule = this.base_url + "api/doctorschedule/InActive";
  private cancelSchedule = this.base_url + "api/appoinment/cancelAll";
  constructor(private http: HttpClient) { }

  addSlotCreate(data: any) {
    return this.http.post<any>(this.createAddSlot, data);
  }
  doctorClinicIdGet(id: any) {
    return this.http.get<any>(this.getDoctorClinicId + '/' + id);
  }
  scheduleGet(id: any) {
    return this.http.get(this.getSchedule + '/' + id);
  }
  scheduleDelete(id: any) {
    return this.http.delete(this.deleteSchedule + '/' + id);
  }
  scheduleUpdate(data: any) {
    return this.http.put<any>(this.updateSchedule, data);
  }
  scheduleGetBy(id: any) {
    return this.http.get<any>(this.getBySchedule + '/' + id);
  }
  scheduleInActive(data: any) {
    return this.http.put(this.inactiveSchedule, data);
  }
  scheduleCancel(id:any,data: any) {
    return this.http.put(this.cancelSchedule + '/' + id, data);
  }
}
