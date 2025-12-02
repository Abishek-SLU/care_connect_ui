import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  Event,
  NavigationStart,
  Router
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
  profilePicture: string = 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png';

  myForm!: FormGroup;
  doctorId: any;

  constructor(
    private router: Router,
    public commonService: CommonService,
    private service: DashboardService,
    private appointmentService: DocAppointmentService,
    private modalservice: NgbModal,
    private docProfilesettService: DocProfileSettingService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });

    this.myForm = this.fb.group({
      doctorArray: this.fb.array([])
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.doctorId = localStorage.getItem('id');
      this.myFunctionInHeader();
    }, 1000);

    this.commonService.functionsToCall$.subscribe(() => {
      this.myFunctionInHeader();
    });
  }

  logout(data: any) {
    this.modalservice.open(data, { size: 'md' });
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

  get doctorArray(): FormArray {
    return this.myForm.get('doctorArray') as FormArray;
  }

  myFunctionInHeader() {
    this.getDoctorinfo();
    this.getdocImage();
  }

  getDoctorinfo() {
    if (!this.doctorId) {
      return;
    }

    this.spinner.show();
    this.service.getDoctorDetails(this.doctorId).subscribe({
      next: (res) => {
        this.values = res.data;


        if (this.values?.doctorImage) {
          const patientData = {
            data: 'data:image/jpeg;base64,' + this.values.doctorImage
          };
          this.image = { patientData };
        }

        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
        if (err?.error?.error?.reason) {
          this.toastr.error(err.error.error.reason);
        }
      }
    });
  }

  getdocImage() {

  }
}