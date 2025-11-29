import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocScheduleTimingService {
  private base_url = environment.Api_url + 'api/doctor/schedule';

  constructor(private http: HttpClient) { }

  createSchedules(data: any) {
    return this.http.post<any>(this.base_url + '/create', data);
  }

  getScheduleById(id: string) {
    return this.http.get<any>(this.base_url + '/id/' + id);
  }

  getSchedules(doctorId?: string) {
    let params = new HttpParams();
    if (doctorId) {
      params = params.set('doctorId', doctorId);
    }
    return this.http.get<any>(this.base_url + '/list', { params });
  }

  updateSchedule(id: string, data: any) {
    return this.http.put<any>(this.base_url + '/update/' + id, data);
  }

  deleteSchedule(id: string) {
    return this.http.delete<any>(this.base_url + '/delete/' + id);
  }
}