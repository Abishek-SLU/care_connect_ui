import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddprescriptionService } from 'src/app/core/service/addprescription/addprescription.service';
import { DashboardService } from 'src/app/core/service/doctors/dashboard/dashboard.service';
import { DocAppointmentService } from 'src/app/core/service/doctors/doctor-appointment/doc-appointment.service';
import { DocAppointmentsService } from 'src/app/core/service/doctors/doctor-appointments/doc-appointments.service';

@Component({
  selector: 'app-edit-prescription',
  templateUrl: './edit-prescription.component.html',
  styleUrls: ['./edit-prescription.component.css']
})
export class EditPrescriptionComponent implements OnInit {
  editPrescription!: FormGroup;
  submitted = false;
  ischeckout = true;

  values: any;
  patientInfo: any;
  patientId: any;
  prescriptionId: any;
  presid: any;
  doctorId: any;
  value: any;
  appointmentid: any;

  constructor(
    private service: AddprescriptionService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private appointmentService: DocAppointmentService,
    private appointmentsService: DocAppointmentsService,
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.doctorId = localStorage.getItem('id');
    this.prescriptionId = this.route.snapshot.paramMap.get('id');
    this.presid = this.prescriptionId;
    this.patientId = localStorage.getItem('patientId');

    this.editPrescription = this.fb.group({
      prescriptionName: [null, Validators.required],
      status: 'ACTIVE',
      prescription: this.fb.array([this.createPresFormGroup()])
    });

    this.getPrescriptionById();
    this.getDoctorinfo();
    this.appointmentsGet();
  }

  get b() {
    return this.editPrescription.controls;
  }

  get prescription(): FormArray {
    return this.editPrescription.get('prescription') as FormArray;
  }

  editAddprescription(): void {
    this.submitted = true;
    if (this.prescription.invalid) {
      return;
    }
    this.prescription.push(this.createPresFormGroup());
  }

  deletePrescription(i: number): void {
    if (this.prescription.length > 1) {
      this.prescription.removeAt(i);
    }
  }

  createPresFormGroup(): FormGroup {
    return this.fb.group({
      id: [null],
      medicineName: [null, Validators.required],
      quantity: [null, Validators.required],
      noOfDays: [null, Validators.required],
      isMorning: [null, Validators.required],
      isAfternoon: [null, Validators.required],
      isEvening: [null, Validators.required],
      isNight: [null, Validators.required],
      status: 'ACTIVE'
    });
  }

  getPrescriptionById(): void {
    this.spinner.show();
    this.service.getById(this.presid).subscribe(
      res => {
        const data = res.data;
        this.patientId = data.patientId;

        this.editPrescription.patchValue({
          prescriptionName: data.prescriptionName
        });

        const prescriptionArray = this.prescription;
        prescriptionArray.clear();

        if (data.prescription && data.prescription.length > 0) {
          data.prescription.forEach(() => {
            prescriptionArray.push(this.createPresFormGroup());
          });

          data.prescription.forEach((item: any, index: number) => {
            prescriptionArray.at(index).patchValue({
              id: item.id,
              medicineName: item.medicineName,
              quantity: item.quantity,
              noOfDays: item.noOfDays,
              isMorning: item.isMorning,
              isAfternoon: item.isAfternoon,
              isEvening: item.isEvening,
              isNight: item.isNight,
              status: 'ACTIVE'
            });
          });
        } else {
          prescriptionArray.push(this.createPresFormGroup());
        }

        this.dashboardService.getPatientDetails(this.patientId).subscribe(pRes => {
          this.patientInfo = pRes.data;
        });

        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  appointmentsGet(): void {
    this.appointmentsService.appGet().subscribe((res: any) => {
      this.value = res.data;
    });
  }

  getDoctorinfo(): void {
    this.dashboardService.getDoctorDetails(this.doctorId).subscribe(res => {
      this.values = res.data;
    });
  }

  getUpdate(): void {
    this.submitted = true;
    if (this.editPrescription.invalid) {
      return;
    }

    const payload = {
      ...this.editPrescription.value,
      patientId: this.patientId,
      doctorId: this.doctorId,
      appointmentId: this.appointmentid
    };

    this.service.update(payload).subscribe(() => {
      this.router.navigate(['doctors/patientsprofile', this.patientId]);
    });
  }
}