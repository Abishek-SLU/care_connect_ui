import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  splitVal:any;
  base = 'Patients';
  page = 'Dashboard';
  patientSidebar: boolean = false;
  breadcrum = true
  showSelect = false
  hideFooter: boolean = false;
  constructor(
    private router: Router,
    public commonService: CommonService
  ) {
   
    if (
      router.url === '/patients/dashboard' ||
      router.url === '/patients/favourites' ||
      router.url === '/patients/profile-settings' ||
      router.url === '/patients/dependent' ||
      router.url === '/patients/accounts' ||
      router.url === '/patients/orders' ||
      router.url === '/patients/medical-records' ||
      router.url === '/patients/medical-details' ||
      router.url === '/patients/change-password'
    ) {
      this.patientSidebar = true;
    } else {
      this.patientSidebar = false;
    }
    if( router.url === '/patients/patient-chat' || router.url === '/patients/maps/map-list' || router.url === '/patients/maps/map-grid'){
      this.breadcrum = false
    }else{
      this.breadcrum = true
    }
    if( router.url === '/patients/search-doctor'){
      this.showSelect = true
    }else{
      this.showSelect = false
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (
          event.url === '/patients/dashboard' ||
          event.url === '/patients/favourites' ||
          event.url === '/patients/profile-settings' ||
          event.url === '/patients/dependent' ||
          event.url === '/patients/accounts' ||
          event.url === '/patients/orders' ||
          event.url === '/patients/medical-records' ||
          event.url === '/patients/medical-details' ||
          event.url === '/patients/change-password'
        ) {
          this.patientSidebar = true;
        } else {
          this.patientSidebar = false;
        }
      }
      if (event instanceof NavigationStart) {
        if (
          event.url === '/patients/patient-chat' ||
          event.url === '/patients/maps/map-list' || 
          event.url === '/patients/maps/map-grid'
        ) {
          this.breadcrum = false
          this.hideFooter = true
        } else {
          this.breadcrum = true
        }
      }
      if (event instanceof NavigationStart) {
        if (
          event.url === '/patients/search-doctor'
          
        ) {
          this.showSelect = true
        } else {
          this.showSelect = false
        }
      }
    });    
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
        if(this.page === "change-password"){
          this.page = "change password"
        }
      }
    });
  }
}
