import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageScheduleService {

  constructor(
   private Http:HttpClient,
   
  ) { }
  private Schedule=environment.Api_url+'api/schedulecancel/getFeaturesSchedule';
  private inactiveSchedule =environment.Api_url+ "api/doctorschedule/InActive";
  private cancelSchedule =environment.Api_url+ "api/appoinment/cancelAll";
  private sms=environment.Api_url+"api/smssend"

  getSchedule(data:any){
    return this.Http.get<any>(this.Schedule,{params: data})
  }
  getInactive(data:any){
    return this.Http.put(this.inactiveSchedule,data)
  }
  getCancel(data:any,id:any){
    return this.Http.put(this.cancelSchedule +'/'+ id, data)
  }
  createSms(data:any,obj:any){
    return this.Http.post<any>(this.sms,data,{params:obj})  
  }
}
