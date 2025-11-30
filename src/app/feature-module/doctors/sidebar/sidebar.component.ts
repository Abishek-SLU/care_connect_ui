import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/core/service/doctors/dashboard/dashboard.service';
import { DocAppointmentService } from 'src/app/core/service/doctors/doctor-appointment/doc-appointment.service';
import { DocProfileSettingService } from 'src/app/core/service/doctors/doctor-profileSetting/doc-profile-setting.service';
import { CommonService } from 'src/app/core/service/service.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  name: any;
  splitVal: any;
  base: any;
  page: any;
  values: any;
  image: any;
  profilePicture: any = 'assets/doc image/default-avatar-profile-icon-vector-18942381.jpg';
  view: any = [];
  myForm!: FormGroup;
  doctorId: any;
  doctorGet: any = [];
  constructor(private router: Router, public commonService: CommonService,
    private service: DashboardService,
    private AppointmentService: DocAppointmentService,
    private modalservice: NgbModal,
    private docProfilesettService: DocProfileSettingService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event instanceof NavigationStart) {
          this.splitVal = event.url.split('/');
          this.base = this.splitVal[1];
          this.page = this.splitVal[2];
        }
      }
    });
    this.myForm = this.fb.group({
      doctorArray: this.fb.array([

      ]),
    });
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.doctorId = localStorage.getItem('userRoleId');
      this.myFunctionInHeader();
    }, 1000);
    this.commonService.functionsToCall$.subscribe(() => {
      this.myFunctionInHeader()
    });
  }


  logout(data: any) {
    this.modalservice.open(data, { size: "md" });

  }
  clear() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.modalservice.dismissAll();
  }

  navigate(name: any) {

    setTimeout(() => {
      this.name = name;
    }, 1000);
  }
  patientData = {}
  addDoctor(patientData: any) {
    this.spinner.show()
    const doctorGroup = this.fb.group({

      data: [patientData.data.data],
    });
    this.doctorArray.push(doctorGroup);
    this.spinner.hide()
  }

  get doctorArray(): FormArray {
    return this.myForm.get('doctorArray') as FormArray;
  }
  imageArr: any = [];
  getdocImage() {
    // this.spinner.show();
    // this.AppointmentService.getImage().subscribe(res => {
    //   this.image = res;

    //   // if (this.image.data !== null) {
    //   //   const patientData = {
    //   //     data: atob(this.image.data)
    //   //   };
    //   if (this.image.data !== null && this.image.data !== undefined) {
    //     const patientData = {
    //       data: atob(this.image.data)
    //     };
    //     // rest of your code
    //     // }
    //     this.image.patientData = patientData;
    //   }
    //   this.imageArr.push(this.image);
    //   this.spinner.hide();
    // },

    //   (err) => {
    //     let error = err.error.error.reason;
    //     console.log(error);
    //     if (error != null) {
    //       this.toastr.error(err.error.error.reason);
    //     }
    //     this.spinner.hide();
    //   })
  }
  getDoctorinfo() {
    this.spinner.show()
    // this.service.getDoctorid().subscribe(res => {
    //   this.values = res.data
    //   this.spinner.hide()
    // })
  }

  myFunctionInHeader() {
    this.getDoctorinfo();
    this.getdocImage();
  }




}
