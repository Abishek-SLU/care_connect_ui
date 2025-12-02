import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MyPatientsService } from 'src/app/core/service/doctors/my-patients/my-patients.service';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
  patients: any[] = [];
  completed: any[] = [];
  imagearr: any[] = [];
  activeKey: any;
  isactive = localStorage.getItem('isactive');
  active = localStorage.getItem('active');
  myForm: FormGroup;

  constructor(
    public commonService: CommonService,
    private service: MyPatientsService,
    private route: Router,
    private modalservice: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      doctorArray: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.activeKey = 1;
    if (this.isactive != null && this.isactive != undefined) {
      this.activeKey = Number(this.isactive);
      localStorage.removeItem('isactive');
    }
    if (this.active != null && this.active != undefined) {
      this.activeKey = Number(this.active);
      localStorage.removeItem('active');
    }
    this.loadPatients();
  }

  get doctorArray(): FormArray {
    return this.myForm.get('doctorArray') as FormArray;
  }

  loadPatients(): void {
    const doctorId = this.commonService.getId();
    if (!doctorId) {
      this.toastr.error('Doctor not found in session');
      return;
    }

    this.spinner.show();
    this.patients = [];
    this.completed = [];
    this.imagearr = [];

    this.service.getAppointmentsByDoctor(doctorId).subscribe(
      res => {
        const list = res?.data || [];
        const acceptedAppointments = list.filter(
          (a: any) => a.appointmentStatus === 'ACCEPTED'
        );
        const completedAppointments = list.filter(
          (a: any) => a.appointmentStatus === 'COMPLETED'
        );

        this.loadPatientsForAppointments(acceptedAppointments, this.patients);
        this.loadPatientsForAppointments(completedAppointments, this.completed);
        this.spinner.hide();
      },
      err => {
        const error = err?.error?.error?.reason || 'Failed to load patients';
        this.toastr.error(error);
        this.spinner.hide();
      }
    );
  }

  loadPatientsForAppointments(appointments: any[], targetArray: any[]): void {
    const handledIds = new Set<string>();

    appointments.forEach(appt => {
      const patientId = appt.patientId;
      if (!patientId || handledIds.has(patientId)) {
        return;
      }

      handledIds.add(patientId);

      this.service.getPatientDetails(patientId).subscribe(
        res => {
          const p = res?.data;
          if (!p) {
            return;
          }

          const patientObj: any = {
            patientId: p.id,
            patientName:
              ((p.firstname || '') + ' ' + (p.lastname || '')).trim() ||
              'Unknown Patient',
            city: p.city || '',
            state: p.state || '',
            mobileNumber: p.phoneNo || '',
            gender: p.gender || '',
            bloodGroup: p.bloodGroup || '',
            patientImage: p.patientImage || null
          };

          if (patientObj.patientImage) {
            const doctorData = {
              patientImage: atob(patientObj.patientImage)
            };
            patientObj.doctorData = doctorData;
          }

          targetArray.push(patientObj);
          this.imagearr.push(patientObj);
        },
        () => { }
      );
    });
  }

  viewPatient(patientId: any): void {
    this.route.navigate(['/doctors/patients-profile/', patientId]);
  }
}