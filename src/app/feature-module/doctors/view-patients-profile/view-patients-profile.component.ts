import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/service/service.index';
import { AddprescriptionService } from 'src/app/core/service/addprescription/addprescription.service';

@Component({
  selector: 'app-view-patients-profile',
  templateUrl: './view-patients-profile.component.html',
  styleUrls: ['./view-patients-profile.component.css']
})
export class ViewPatientsProfileComponent implements OnInit {

  patientId: string | null = null;
  appointmentId: string | null = null;
  patientInfo: any;
  profileImageSrc: string | null = null;
  appointments: any[] = [];
  lastAppointment: any;
  prescriptions: any[] = [];
  medicalRecords: any[] = [];
  billings: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private commonService: CommonService,
    private prescriptionService: AddprescriptionService
  ) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if (!this.patientId) {
      this.toastr.error('Patient not found');
      this.router.navigate(['/doctors/mypatients']);
      return;
    }
    this.loadPatientInfo();
    this.loadAppointments();
    this.loadPrescriptions();
  }

  loadPatientInfo(): void {
    this.spinner.show();
    this.commonService.getPatientDetails(this.patientId).subscribe(
      res => {
        const p = res?.data || res;
        this.patientInfo = {
          name: ((p.firstname || '') + ' ' + (p.lastname || '')).trim(),
          patientCode: p.patientCode || p.id,
          city: p.cityName || '',
          state: p.stateName || '',
          mobileno: p.phoneNo || '',
          gender: p.gender || '',
          bloodGroup: p.bloodGroup || ''
        };
        if (p.patientImage) {
          this.profileImageSrc = 'data:image/jpeg;base64,' + p.patientImage;
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
    this.commonService
      .getAppointmentsByPatient(this.patientId as string)
      .subscribe(
        res => {
          const list = res?.data || [];
          this.appointments = list.map((a: any) => ({
            id: a.id,
            doctorId: a.doctorId,
            appointmentDate: a.appointmentDate,
            bookingDate: a.bookingDate,
            doctorFee: a.doctorFee,
            appointmentStatus: a.appointmentStatus,
            doctorName: a.doctorName,
            specializationName: a.specializationName,
            appointmentTime: a.appointmentTime,
            doctorImage: a.doctorImage
              ? 'data:image/jpeg;base64,' + a.doctorImage
              : null
          }));
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
    this.prescriptionService.getByPatient(this.patientId).subscribe(
      res => {
        this.prescriptions = res?.data || [];
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  deletePrescription(id: string): void {
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