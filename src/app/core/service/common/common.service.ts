import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {



  private baseUrl = environment.Api_url;
  private loginUrl = this.baseUrl + "auth/login";
  private userDetailsUrl = this.baseUrl + "auth/user-details";
  private generateOTPUrl = this.baseUrl + "api/register/generate-otp";
  private verifyOTPUrl = this.baseUrl + "api/register/verify-otp";
  private userUpdateURL = this.baseUrl + "api/register/update";
  private getCityURL = this.baseUrl + "api/city/get";
  private getStateURL = this.baseUrl + "api/state/get";
  private getCountryURL = this.baseUrl + "api/country/get";

  private createCountryURL = this.baseUrl + "api/country/create";
  private updateCountryURL = this.baseUrl + "api/country/update";
  private deleteCountryURL = this.baseUrl + "api/country/delete/";

  private createStateURL = this.baseUrl + "api/state/create";
  private updateStateURL = this.baseUrl + "api/state/update";
  private deleteStateURL = this.baseUrl + "api/state/delete/";

  public patients: any = [
    {
      patientName: 'Richard Wilson',
      patient_id: 'P0016',
      apptDate: 'Sat May 23 2020 13:35:47 GMT+0530 (India Standard Time)',
      purpose: 'General',
      type: 'New patient',
      email: 'richard@example.com',
      phone: '+1 923 782 4575',
      amount: 150,
      status: 0,
    },
    {
      patientName: 'Richard Wilson',
      patient_id: 'P0001',
      email: 'richard@example.com',
      apptDate: 'Sat May 23 2020 13:35:47 GMT+0530 (India Standard Time)',
      purpose: 'General',
      type: 'Old patient',
      phone: '+1 828 632 9170',
      amount: 200,
      status: 0,
    },
    {
      patientName: 'Richard Wilson',
      patient_id: 'P0002',
      email: 'richard@example.com',
      apptDate: 'Sat May 23 2020 13:35:47 GMT+0530 (India Standard Time)',
      purpose: 'General',
      type: 'New patient',
      phone: '+1 828 632 9170',
      amount: 350,
      status: 0,
    },
    {
      patientName: 'Richard Wilson',
      email: 'richard@example.com',
      patient_id: 'P0003',
      apptDate: 'Sat May 23 2020 13:35:47 GMT+0530 (India Standard Time)',
      purpose: 'General',
      type: 'New patient',
      amount: 400,
      status: 0,
    },
  ];

private createCityURL = this.baseUrl + "api/city/create";
private updateCityURL = this.baseUrl + "api/city/update";
private deleteCityURL = this.baseUrl + "api/city/delete/";



getCityById(id: any) {
  return this.http.get(this.getCityURL + `/${id}`);
}

cityCreate(payload: any) {
  return this.http.post(this.createCityURL, payload);
}

cityUpdate(payload: any) {
  return this.http.put(this.updateCityURL, payload);
}

cityDelete(id: any) {
  return this.http.delete(this.deleteCityURL + `${id}`);
}

  messages: any = '';
  SERVER_URL: string = 'http://localhost:8080/api/';
  public message: BehaviorSubject<String> = new BehaviorSubject<String>('');
  functionsToCall$: any;
  constructor(public http: HttpClient, private router: Router) {
    this.message = new BehaviorSubject(this.messages);
  }

  getStateById(id: any) {
    return this.http.get(this.getStateURL + `/${id}`);
  }

  stateCreate(payload: any) {
    return this.http.post(this.createStateURL, payload);
  }

  stateUpdate(payload: any) {
    return this.http.put(this.updateStateURL, payload);
  }

  stateDelete(id: any) {
    return this.http.delete(this.deleteStateURL + `${id}`);
  }
  getCountryById(id: any) {
    return this.http.get(this.getCountryURL + `/${id}`);
  }
  countryDelete(id: any) {
    return this.http.delete(this.deleteCountryURL + `${id}`);
  }
  countryUpdate(payload: any) {
    return this.http.put(this.updateCountryURL, payload);
  }
  countryCreate(payload: any) {
    return this.http.post(this.createCountryURL, payload);
  }

  getCity() {
    return this.http.get(this.getCityURL);
  }
  getState() {
    return this.http.get(this.getStateURL);
  }
  getCountry() {
    return this.http.get(this.getCountryURL);
  }

  login_Url(data: any) {
    return this.http.post<any>(this.loginUrl, data);
  }
  userDetails() {
    return this.http.get<any>(this.userDetailsUrl);
  }
  userRegisterUpdate(data: any) {
    return this.http.put<any>(this.userUpdateURL, data);
  }

  verifyOtp(data: any) {
    return this.http.post<any>(this.verifyOTPUrl, data);
  }

  generateOTP(data: any) {
    return this.http.post<any>(this.generateOTPUrl, data);
  }
  gettoken() {
    return localStorage.getItem('token');
  }
  userRoleId() {
    return localStorage.getItem('userRoleId');
  }
  roleName() {
    return localStorage.getItem("roleName");
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  registerOtp(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/send`, payload);
  }

  /**
   * Verify the entered OTP
   * @param payload - { mobileNo: string, otp: string }
   */

  nextmessage(data: any) {
    this.message.next(data);
  }

  getJSON(): Observable<any> {
    // return this.http.get("./assets/data.json");
    return this.patients;
  }

  update(id: any, status: any, list: any) {
    let filter = list.filter((a: any) => a.patient_id === id);
    if (filter.length != 0) {
      filter['status'] = status;
    }
  }

  getSpeciality() {
    return this.http.get(this.SERVER_URL + 'specialityList');
  }

  createSpeciality(data: any) {
    return this.http.post(`${this.SERVER_URL + 'specialityList'}`, data);
  }

  updateSpeciality(data: any, id: any) {
    return this.http.put(`${this.SERVER_URL + 'specialityList'}/${id}`, data);
  }

  deleteSpeciality(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'specialityList'}/${id}`);
  }

  getDoctors() {
    return this.http.get(this.SERVER_URL + 'doctors');
  }
  getSearchDoctors() {
    return this.http.get(this.SERVER_URL + 'searchDoctor');
  }

  getDoctorDetails(id: any) {
    return this.http.get(`${this.SERVER_URL + 'doctors'}/${id}`);
  }

  getAppointments() {
    return this.http.get(this.SERVER_URL + 'appointments');
  }

  updateAppointment(data: any, id: any) {
    return this.http.put(`${this.SERVER_URL + 'appointments'}/${id}`, data);
  }

  getpatients() {
    return this.http.get(this.SERVER_URL + 'patients');
  }

  createBlogs(data: any) {
    return this.http.post(`${this.SERVER_URL + 'blogs'}`, data);
  }

  getBlogs() {
    return this.http.get(this.SERVER_URL + 'blogs');
  }

  getBlogsDetails(id: any) {
    return this.http.get(`${this.SERVER_URL + 'blogs'}/${id}`);
  }

  updateBlog(data: any, id: any) {
    return this.http.put(`${this.SERVER_URL + 'blogs'}/${id}`, data);
  }

  deleteBlog(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'blogs'}/${id}`);
  }

  createDoctor(data: any) {
    return this.http.post(`${this.SERVER_URL + 'doctors'}`, data);
  }

  createPatient(data: any) {
    return this.http.post(`${this.SERVER_URL + 'patients'}`, data);
  }

  getPatientDetails(id: any) {
    return this.http.get(`${this.SERVER_URL + 'patients'}/${id}`);
  }

  createAppointment(params: any) {
    return this.http.post(`${this.SERVER_URL + 'appointments'}`, params);
  }

  getFav() {
    return this.http.get(this.SERVER_URL + 'favourites');
  }

  createFav(params: any) {
    return this.http.post(this.SERVER_URL + 'favourites', params);
  }

  getComments() {
    return this.http.get(this.SERVER_URL + 'comments');
  }

  createComment(params: any) {
    return this.http.post(this.SERVER_URL + 'comments', params);
  }

  deleteFav(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'favourites'}/${id}`);
  }

  getTransactions() {
    return this.http.get(this.SERVER_URL + 'transactions');
  }

  deleteTransaction(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'transactions'}/${id}`);
  }

  getReviews() {
    return this.http.get(this.SERVER_URL + 'reviews');
  }

  deleteReview(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'reviews'}/${id}`);
  }

  getProducts() {
    return this.http.get(this.SERVER_URL + 'products');
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'products'}/${id}`);
  }

  getCategories() {
    return this.http.get(this.SERVER_URL + 'categories');
  }

  deleteCategory(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'categories'}/${id}`);
  }

  getOrders() {
    return this.http.get(this.SERVER_URL + 'orders');
  }

  deleteOrder(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'orders'}/${id}`);
  }

  getPharmacyReports() {
    return this.http.get(this.SERVER_URL + 'pharmacy_reports');
  }

  deletePharmacyReports(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'pharmacy_reports'}/${id}`);
  }

  getPurchase() {
    return this.http.get(this.SERVER_URL + 'purchase');
  }

  deletePurchase(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'purchase'}/${id}`);
  }

  getSales() {
    return this.http.get(this.SERVER_URL + 'sales');
  }

  deleteSale(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'sale'}/${id}`);
  }
  getPharmacyTransactions() {
    return this.http.get(this.SERVER_URL + 'pharmacy_transactions');
  }

  deletePharmacyTransactions(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'pharmacy_transactions'}/${id}`);
  }

  getPharmacy() {
    return this.http.get(this.SERVER_URL + 'pharmacy');
  }

  deletePharmacy(id: any) {
    return this.http.delete(`${this.SERVER_URL + 'pharmacy'}/${id}`);
  }
}
