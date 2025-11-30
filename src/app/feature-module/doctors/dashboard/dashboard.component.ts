import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/core/service/doctors/dashboard/dashboard.service';
import { DoctorService } from 'src/app/core/service/doctors/newDoctor/doctor.service';
import { CommonService } from 'src/app/core/service/service.index';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  list: any = [];
  id: any
  appointmentId: any;
  appointments: any = [];
  patients: any = [];
  patientsLength: any;
  appointmentsLength: any;
  TotalPatientsLength: any;
  activeTab = 'today';
  submitted = false;
  cancelApp: any = [];
  // docId:any=[];
  values: any = [];
  userId: any;
  patientId: any;
  counts: any = [];
  doctorId: any;
  roleName: any;
  doctorGetAll: any;
  doctorGet: any;
  patientID: any
  Appointment: any = [];
  count: any = [];
  modalRef: any;
  decodedString: string = '';
  //  Accept: boolean = false;
  myForm: FormGroup;
  currentDate: any;
  acceptHidden: boolean = false;
  cancelHidden: boolean = false;
  acceptbtnText: string = 'Accept';
  cancelbtnText: string = 'Cancel';
  profilePicture: any = 'assets/doc image/default-avatar-profile-icon-vector-18942381.jpg';
  script: any = 'as';
  constructor(private toastr: ToastrService, public commonService: CommonService,

    private fb: FormBuilder,
    private service: DashboardService,
    private doctorService: DoctorService,
    private rout: Router,
    private modalservice: NgbModal,
    private spinner: NgxSpinnerService,

  ) {
    this.myForm = this.fb.group({
      doctorArray: this.fb.array([

      ]),
    });
  }

  ngOnInit(): void {
    this.currentDate = new Date().toISOString().split('T')[0];
    this.getCancelAppointment();

    this.roleName = localStorage.getItem("roleName");
    if (this.roleName === "PATIENT") {
      this.rout.navigate(['/doctors/patientsprofile']);
    }
    this.list = this.list.filter((a: any) => a.status === 0);
    this.getDashboard();
    this.calculatePercentage(this.counts?.totalPatients)

  }
  calculatePercentage(currentValue: number): number {
    const totalValue = 40;  // Use appropriate total value
    if (totalValue && currentValue >= 0) {
      return (currentValue / totalValue) * 100;
    } else {
      return 0; // Default percentage if totalValue is not available or currentValue is negative
    }
  }
  calculatePercentage2(currentValue: number): number {
    const totalValue = 40; // Use appropriate total value
    if (totalValue && currentValue >= 0) {
      return (currentValue / totalValue) * 100;
    } else {
      return 0; // Default percentage if totalValue is not available or currentValue is negative
    }
  }
  calculatePercentage3(currentValue: number): number {
    const totalValue = 40 // Use appropriate total value
    if (totalValue && currentValue >= 0) {
      return (currentValue / totalValue) * 100;
    } else {
      return 0; // Default percentage if totalValue is not available or currentValue is negative
    }
  }

  addAppointment() {
    console.log("Total Patients:", this.counts?.totalPatients);
    console.log("Today Patients:", this.counts?.todayPatients);
    console.log("Today Appointments:", this.counts?.todayAppointments);

    // Recalculate percentages for all graphs
    const totalPatientsPercentage = this.calculatePercentage(this.counts?.totalPatients);
    const todayAppointmentsPercentage = this.calculatePercentage3(this.counts?.todayAppointments);
    const todayPatientsPercentage = this.calculatePercentage2(this.counts?.todayPatients);

    console.log("totalPatientsPercentage", totalPatientsPercentage);
    console.log("todayPatientsPercentage", todayPatientsPercentage);
    console.log("todayAppointmentsPercentage", todayAppointmentsPercentage)

    setTimeout(() => {
      this.counts.totalPatientsPercentage = totalPatientsPercentage;
      this.counts.todayPatientsPercentage = todayPatientsPercentage;
      this.counts.todayAppointmentsPercentage = todayAppointmentsPercentage;
    }, 200);
  }
  search(activeTab: any) {
    this.activeTab = activeTab;
  }

  result(activeTab: any) {
    this.activeTab = activeTab;
  }
  Cancelled(activeTab: any) {
    this.getCancelAppointment();
    this.activeTab = activeTab;
  }
  openmodal(contant: any) {
    this.modalservice.open(contant, { size: "md" })
  }
  upappoint: any;
  todayApp: any = [];
  today: any;
  view: any;
  doctorData = {}
  addDoctor(doctorData: any) {
    const doctorGroup = this.fb.group({

      patientImage: [doctorData.patientImage.patientImage],
    });
    this.doctorArray.push(doctorGroup);
  }

  get doctorArray(): FormArray {
    return this.myForm.get('doctorArray') as FormArray;
  }
  data: any
  getDashboard() {
    this.spinner.show();
    this.service.getForm().subscribe(res => {

      this.counts = res.data.counts;


      this.todayApp = res.data.todayAppointments;
      // this.today = this.todayApp.filter((res: any) => {
      //   res.status === 'ACCEPT';

      // })
      this.Appointment = res.data.upcomingAppointments;
      // this.upappoint = this.Appointment.filter((res: any) => {
      //  res.status === 'ACCEPT';
      // })
      for (let i = 0; i < this.todayApp?.length; i++) {
        if (this.todayApp[i].patientImage != null) {
          const doctorData = {
            patientImage: atob(this.todayApp[i].patientImage)
          };
          this.todayApp[i].doctorData = doctorData;
        }
        this.imageArr.push(this.todayApp[i]);
      }
      for (let i = 0; i < this.Appointment?.length; i++) {
        if (this.Appointment[i].patientImage != null) {
          const doctorData = {
            patientImage: atob(this.Appointment[i].patientImage)
          };
          this.Appointment[i].doctorData = doctorData;
        }
        this.imageArr.push(this.Appointment[i]);
      }
      this.spinner.hide();

    },


      (err) => {
        let error = err.error.error.reason;
        console.log(error);
        if (error != null) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })

  }

  acceptedAppointmentId: any = null;
  cancelledAppointmentId: any = null;
  accept(id: any) {
    let statusDto = { id: '', status: '' };
    statusDto.id = id;
    statusDto.status = "ACCEPT";



    this.acceptbtnText = "Accepted";
    this.service.getAcceptApp(statusDto).subscribe((res: any) => {
      this.toastr.success(res.data);

      this.getDashboard();
    });
  }
  appId: any;

  modal(modal: any, id: any) {
    this.modalservice.open(modal, { size: "md" })
    this.appId = id;

  }
  cancel(modal: any) {

    let statusDto = { id: '', status: '' };
    statusDto.id = this.appId;
    statusDto.status = "CANCEL";

    this.cancelbtnText = "Cancelled"
    this.service.getAcceptApp(statusDto).subscribe((res: any) => {
      this.toastr.success(res.data);
      this.getDashboard();
      modal.dismiss('cross click')
    }
    );

  }
  patientGet: any
  imageArr: any = []
  getCancelAppointment() {
    // this.spinner.show();
    // this.service.getCancel().subscribe(res => {
    //   this.cancelApp = res.data

    //   this.spinner.hide();
    //   for (let i = 0; i < this.cancelApp?.length; i++) {
    //     if (this.cancelApp[i].patientImage != null) {
    //       const doctorData = {
    //         patientImage: atob(this.cancelApp[i].patientImage)
    //       };
    //       this.cancelApp[i].doctorData = doctorData;
    //     }
    //     this.imageArr.push(this.cancelApp[i]);
    //   }
    // },
    //   // this.spinner.hide();

    //   (err) => {
    //     let error = err.error.error.reason;
    //     console.log(error);
    //     if (error != null) {
    //       this.toastr.error(err.error.error.reason);
    //     }
    //     this.spinner.hide();
    //   })
  }


  // viewPatient(patientId: any) {
  //   this.rout.navigate(['/doctors/patientsprofile', patientId])
  // }

  viewPatient(patientId: any, index: any) {

    const status = this.today.filter((res: any) => res.patientId == patientId);
    console.log(status[0]);
    console.log(status[index]);

    if (status[0].status === 'PENDING' || status[index].status === 'PENDING') {
      this.toastr.error('Patient status is not accepted. Cannot proceed.');
    } else {
      this.rout.navigate(['/doctors/patientsprofile', patientId])
    }

  }


}
// this.doctorGet = this.doctorGetAll;
//       for (let i = 0; i < this.doctorGet.length; i++) {
//         if (this.doctorGet[i].doctorImage != null) {
//           const doctorData = {
//             doctorId: this.doctorGet[i]?.doctorImage?.doctorId,
//             doctorName: this.doctorGet[i]?.doctorImage?.doctorName,
//             doctorImage: atob(this.doctorGet[i]?.doctorImage?.doctorImage)
//           };
//           this.doctorGet[i].doctorData = doctorData;
//         }
//         this.imagearr.push(this.doctorGet[i]);