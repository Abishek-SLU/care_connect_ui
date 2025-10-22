import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.css']
})
export class SearchDoctorComponent implements OnInit {
  doctors: any = [];
  specialityList: any = [];
  type: string | undefined;
  specialist = "";
  speciality: string | undefined;
  selDate: any;
  constructor(public commonService: CommonService, public router: Router) { }
  images = [
    {
      path: 'assets/img/features/feature-01.jpg',
    },
    {
      path: 'assets/img/features/feature-02.jpg',
    },
    {
      path: 'assets/img/features/feature-03.jpg',
    },
    {
      path: 'assets/img/features/feature-04.jpg',
    },
  ];
  ngOnInit(): void {
    this.getDoctors();
    this.getspeciality();
  }
  
  getDoctors() {
    this.commonService.getSearchDoctors().subscribe(res => {
      this.doctors = res;
      console.log(res);
      
    })
  }

  getspeciality() {
    this.commonService.getSpeciality().subscribe(res => {
      this.specialityList = res;
    })
  }

  checkType(event:any) {
    if (event.target.checked) {
      this.type = event.target.value;
    } else {
      this.type = "";
    }
  }

  search() {
    if (this.type && this.speciality) {
      this.doctors = this.doctors.filter((a: { type: string | undefined; speciality: string | undefined; }) => a.type === this.type && a.speciality === this.speciality)
    } else {
      this.getDoctors();
    }

  }

  checkSpeciality(event:any) {
    if (event.target.checked) {
      this.speciality = event.target.value;
    } else {
      this.speciality = "";
    }

    var filter = this.specialityList.filter((a: { speciality: any; }) => a.speciality === event.target.value);
    if (filter.length != 0) {
      filter[0]['checked'] = true;
    }
    this.specialityList.forEach((index: { [x: string]: boolean; speciality: any; }) => {
      if (index.speciality != event.target.value) {
        index['checked'] = false;
      }
    })
  }

  bookAppointment(id: string) {
    // if((localStorage.getItem('auth') === 'true') && (localStorage.getItem('patient') === 'true')) {
    this.router.navigateByUrl('/patients/booking?id=' + id);
    // } else {
    //   this.router.navigate(['/']);
    // }
  }

}
