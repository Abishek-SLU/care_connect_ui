import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private http: HttpClient
  ) { }
  private checkoutUrl = environment.Api_url + 'api/appoinment/create';
  private checkgetUrl = environment.Api_url + 'api/checkout/schedule';
  private getUrl = environment.Api_url + 'api/appoinment/check'
  
  checkoutCreate(data: any) {
    return this.http.post<any>(this.checkoutUrl, data);
  }
  
  checkoutGet(id: any,bookingDate:any) {
    return this.http.get<any>(this.checkgetUrl + '/' + id,{params:bookingDate});
  }
  // Get(id: any) {
  //   return this.http.get<any>(this.getUrl + '/' + id);
  // }
}
