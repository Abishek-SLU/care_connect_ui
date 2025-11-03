import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloodgroupService {

  constructor(
    private Http : HttpClient,
  ) { }
  private bloodgroupcreateUrl = environment.Api_url+'api/bloodgroup/create';
  private  bloodgroupGetUrl = environment.Api_url+'api/bloodgroup/get';
  private  bloodgroupEditUrl = environment.Api_url+'api/bloodgroup/get';
  private bloodgroupUpdateUrl = environment.Api_url+'api/bloodgroup/update';
  private bloodgroupDeleteUrl = environment.Api_url+'api/bloodgroup/delete';
  
  bloodgroupCreate(data:any){
    return this.Http.post<any>(this .bloodgroupcreateUrl,data);
      }
    bloodgroupGet(){
      return this.Http.get<any>(this.bloodgroupGetUrl);
    }
    bloodgroupEdit(id:any){
      return this.Http.get<any>(this.bloodgroupEditUrl +'/' +id);
    }
    bloodgroupUpdate(data:any){
      return this.Http.put<any>(this.bloodgroupUpdateUrl ,data);
    }
    bloodgroupDelete(id:any){
      return this.Http.delete<any>(this.bloodgroupDeleteUrl+'/'+id);
    }
}
