import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddprescriptionService } from 'src/app/core/service/addprescription/addprescription.service';
import { DocAppointmentService } from 'src/app/core/service/doctors/doctor-appointment/doc-appointment.service';
import { DocAppointmentsService } from 'src/app/core/service/doctors/doctor-appointments/doc-appointments.service';
import { DashboardService } from 'src/app/core/service/doctors/dashboard/dashboard.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  patientId: any;
  patientInfo: any;
  profileImageSrc: string | null = null;
  appointments: any[] = [];
  lastAppointment: any;
  prescriptions: any[] = [];
  values: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private appointmentService: DocAppointmentService,
    private appointmentsService: DocAppointmentsService,
    private prescriptionService: AddprescriptionService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if (this.patientId) {
      this.loadPatientInfo();
      this.loadAppointments();
      this.loadPrescriptions();
      this.loadDoctorInfo();
    }
  }

  loadPatientInfo(): void {
    this.spinner.show();
    this.appointmentService.getPatient(this.patientId).subscribe(
      res => {
        this.patientInfo = res.data;
        if (this.patientInfo?.patientImage) {
          this.profileImageSrc =
            'data:image/jpeg;base64,' + this.patientInfo.patientImage;
        }
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  loadAppointments(): void {
    this.spinner.show();
    this.appointmentsService.appGet().subscribe(
      res => {
        const all = res.data || [];
        this.appointments = all.filter(
          (a: any) => a.patientId === this.patientId
        );
        if (this.appointments.length > 0) {
          this.lastAppointment = this.appointments[0];
        }
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  loadPrescriptions(): void {
    this.spinner.show();
    this.prescriptionService.getForm(this.patientId).subscribe(
      res => {
        this.prescriptions = res.data || [];
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  loadDoctorInfo(): void {
    // this.dashboardService.getDoctorid().subscribe(res => {
    //   this.values = res.data;
    // });
  }

  deletePrescription(id: any): void {
    this.spinner.show();
    this.prescriptionService.deleteId(id).subscribe(
      () => {
        this.toastr.success('Prescription deleted successfully');
        this.loadPrescriptions();
        this.spinner.hide();
      },
      () => {
        this.toastr.error('Unable to delete prescription');
        this.spinner.hide();
      }
    );
  }
}