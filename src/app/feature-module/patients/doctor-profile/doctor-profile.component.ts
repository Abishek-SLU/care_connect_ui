import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  id:any;
  doctorDetails:any;
  constructor(
    public commonService: CommonService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
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
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.queryParams['id'];
    this.getDoctorsDetails();
  }

  getDoctorsDetails() {
    if (!this.id) {
      this.id = 1;
    }
    this.commonService.getDoctorDetails(this.id).subscribe((res) => {
      this.doctorDetails = res;
    });
  }

  addFav() {
    this.commonService.createFav(this.doctorDetails).subscribe((res) => {
      this.toastr.success('', 'Added to favourite successfully!');
    });
  }
}
