import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  splitVal: any;
  url: any;
  base = 'Doctors';
  page = 'Dashboard';
  childpage:any;
  doctorSidebar: boolean = true;
  hideFooter: boolean = false;
  constructor(private router: Router, public commonService: CommonService) {
    if (
      router.url === '/doctors/message' ||
      router.url === '/doctors/doctor-register' ||
      router.url === '/doctors/patients-profile' ||
      router.url === '/doctors/patients/patients-profile' ||
      router.url === '/doctors/patients/add-prescription' ||
      router.url === '/doctors/patients/edit-prescription' ||
      router.url === '/doctors/patients/add-billing' ||
      router.url === '/doctors/patients/edit-billing'
    ) {
      this.doctorSidebar = false;
    } else {
      this.doctorSidebar = true;
    }
    if (router.url === '/doctors/message') {
      this.hideFooter = true
    }
    else {
      this.hideFooter = false
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (
          event.url === '/doctors/message' ||
          event.url === '/doctors/doctor-register' ||
          event.url === '/doctors/patients-profile' ||
          event.url === '/doctors/patients/patients-profile' ||
          event.url === '/doctors/patients/add-prescription' ||
          event.url === '/doctors/patients/edit-prescription' ||
          event.url === '/doctors/patients/add-billing' ||
          event.url === '/doctors/patients/edit-billing'
        ) {
          this.doctorSidebar = false;
        } else {
          this.doctorSidebar = true;
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
        this.childpage = this.splitVal[3];
        if (this.page === 'change-password') {
          this.page = 'change password';
        }
        if (this.page === 'message') {
          this.hideFooter = true
        }
        else {
          this.hideFooter = false
        }
      }
    });
  }
}
