import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddprescriptionService } from 'src/app/core/service/addprescription/addprescription.service';
import { DashboardService } from 'src/app/core/service/doctors/dashboard/dashboard.service';
import { DocAppointmentService } from 'src/app/core/service/doctors/doctor-appointment/doc-appointment.service';
import { DocAppointmentsService } from 'src/app/core/service/doctors/doctor-appointments/doc-appointments.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {
  addPrescription!: FormGroup;
  submitted = false;
  doctorInfo: any;
  doctorId: any;
  patientId: any;
  appointmentId: any;
  patientInfo: any;
  profileImageSrc: string | null = null;
  appointmentsForPatient: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: AddprescriptionService,
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private appointmentService: DocAppointmentService,
    private appointmentsService: DocAppointmentsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.doctorId = localStorage.getItem('userRoleId');
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.buildForm();
    if (this.patientId) {
      this.loadPatientInfo();
      this.loadAppointmentsForPatient();
    }
    this.loadDoctorInfo();
  }

  buildForm(): void {
    this.addPrescription = this.fb.group({
      prescriptionName: [null, Validators.required],
      prescription: this.fb.array([this.createPrescriptionRow()])
    });
  }

  atLeastOneCheckboxChecked(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const morning = group.get('isMorning')?.value;
      const afternoon = group.get('isAfternoon')?.value;
      const evening = group.get('isEvening')?.value;
      const night = group.get('isNight')?.value;
      const atLeastOne = morning || afternoon || evening || night;
      return atLeastOne ? null : { atLeastOneCheckboxChecked: true };
    };
  }

  createPrescriptionRow(): FormGroup {
    return this.fb.group(
      {
        medicineName: [null, Validators.required],
        quantity: [null, Validators.required],
        noOfDays: [null, Validators.required],
        isMorning: [false],
        isAfternoon: [false],
        isEvening: [false],
        isNight: [false]
      },
      { validators: this.atLeastOneCheckboxChecked() }
    );
  }

  get b() {
    return this.addPrescription.controls;
  }

  get prescription(): FormArray {
    return this.addPrescription.get('prescription') as FormArray;
  }

  addPrescriptionRow(): void {
    this.prescription.push(this.createPrescriptionRow());
  }

  deletePrescriptionRow(index: number): void {
    if (this.prescription.length === 1) {
      this.toastr.warning(
        "Can't delete the row when there is only one row",
        'Warning'
      );
      return;
    }
    this.prescription.removeAt(index);
  }

  clear(): void {
    this.submitted = false;
    this.addPrescription.reset();
    this.prescription.clear();
    this.prescription.push(this.createPrescriptionRow());
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

  loadDoctorInfo(): void {
    this.dashboardService.getDoctorid().subscribe(res => {
      this.doctorInfo = res.data;
    });
  }

  loadAppointmentsForPatient(): void {
    this.spinner.show();
    this.appointmentsService.appGet().subscribe(
      res => {
        const data = res.data || [];
        this.appointmentsForPatient = data.filter(
          (a: any) => a.patientId === this.patientId
        );
        if (this.appointmentsForPatient.length > 0) {
          this.appointmentId = this.appointmentsForPatient[0].appointmentId;
        }
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  save(): void {
    this.submitted = true;
    if (this.addPrescription.invalid) {
      this.toastr.error('Please fill all required fields');
      return;
    }

    const payload = {
      ...this.addPrescription.value,
      doctorId: this.doctorId,
      patientId: this.patientId,
      appointmentId: this.appointmentId
    };

    this.spinner.show();
    this.service.createForm(payload).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('Prescription saved successfully');
        this.router.navigate(['/doctors/patientsprofile', this.patientId]);
      },
      err => {
        this.spinner.hide();
        const msg =
          err?.error?.error?.message || 'Failed to save prescription';
        this.toastr.error(msg);
      }
    );
  }

  viewPatient(id: any): void {
    this.router.navigate(['/doctors/patientsprofile', id]);
  }
}