import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicaldetailsService } from 'src/app/core/service/medical-details/medical-details.service';
import { CommonService } from 'src/app/core/service/service.index';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-medical-details',
  templateUrl: './medical-details.component.html',
  styleUrls: ['./medical-details.component.css']
})
export class MedicalDetailsComponent implements OnInit {
  medicalDetailForm!: FormGroup;
  validation = false;
  value: any[] = [];
  patientId: any;

  constructor(
    private mdForm: FormBuilder,
    private modalservice: NgbModal,
    private toastr: ToastrService,
    private service: MedicaldetailsService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.patientId = this.commonService.getId();
    this.medicalDetailForm = this.mdForm.group({
      id: [null],
      patientId: [null],
      bmi: [null, [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      heartRate: [null, [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      weight: [null, [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      fbcStatus: [null, [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      status: ['ACTIVE']
    });
    this.getMedicalDetails();
  }

  get f() {
    return this.medicalDetailForm.controls;
  }

  getMedicalDetails() {
    this.spinner.show();
    this.service.medicalDetailsGet(this.patientId).subscribe(
      res => {
        this.value = res.data;
        this.spinner.hide();
      },
      err => {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    );
  }

  getEdit(id: any, modal: any) {
    this.modalservice.open(modal, { size: 'md' });
    this.service.medicalDetailsGetById(id).subscribe(res => {
      this.medicalDetailForm.patchValue({
        id: res.data.id,
        patientId: res.data.patientId,
        bmi: res.data.bmi,
        heartRate: res.data.heartRate,
        weight: res.data.weight,
        fbcStatus: res.data.fbcStatus,
        status: res.data.status ? res.data.status : 'ACTIVE'
      });
    });
  }

  deleteId: any;

  deleteModal(id: any, modal: any) {
    this.modalservice.open(modal, { size: 'md' });
    this.deleteId = id;
  }

  getDelete(modal: any) {
    this.service.medicalDetailsdelete(this.deleteId).subscribe(
      res => {
        this.getMedicalDetails();
        this.toastr.error(res.data);
      },
      err => {
        this.toastr.error(err.error.error.reason);
      }
    );
    modal.dismiss('cross click');
  }

  getUpdate(modal: any) {
    this.validation = true;
    if (this.medicalDetailForm.invalid) {
      this.toastr.error('Please fill in all required fields.', 'Validation Error!');
      return;
    }
    const payload = {
      ...this.medicalDetailForm.value,
      patientId: this.patientId,
      status: 'ACTIVE'
    };
    this.service.medicalDetailsUpdate(payload).subscribe(
      res => {
        this.getMedicalDetails();
        this.medicalDetailForm.reset({});
        modal.dismiss('cross click');
        this.toastr.success(res.data);
      },
      err => {
        this.toastr.error(err.error.error.reason);
      }
    );
  }

  submit(modal: any) {
    this.validation = true;
    if (this.medicalDetailForm.invalid) {
      this.toastr.error('Please fill in all required fields.', 'Validation Error!');
      return;
    }
    const payload = {
      ...this.medicalDetailForm.value,
      patientId: this.patientId,
      status: 'ACTIVE'
    };
    this.service.medicalDetailsCreate(payload).subscribe(
      res => {
        this.getMedicalDetails();
        this.toastr.success(res.data);
        this.medicalDetailForm.reset({});
        modal.dismiss('Cross click');
      },
      err => {
        this.toastr.error(err.error.error.reason);
      }
    );
  }

  openmodal(content: any) {
    this.validation = false;
    this.medicalDetailForm.reset({
      id: null,
      patientId: this.patientId,
      bmi: null,
      heartRate: null,
      weight: null,
      fbcStatus: null,
      status: 'ACTIVE'
    });
    this.modalservice.open(content, { size: 'md' });
  }

  getMaxDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onInput(event: any) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '').substring(0, 3);
    event.target.value = numericValue;
    this.medicalDetailForm.controls['bmi'].setValue(numericValue);
  }

  onInput1(event: any) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '').substring(0, 3);
    event.target.value = numericValue;
    this.medicalDetailForm.controls['heartRate'].setValue(numericValue);
  }

  onInput2(event: any) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '').substring(0, 3);
    event.target.value = numericValue;
    this.medicalDetailForm.controls['weight'].setValue(numericValue);
  }

  onInput3(event: any) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '').substring(0, 3);
    event.target.value = numericValue;
    this.medicalDetailForm.controls['fbcStatus'].setValue(numericValue);
  }
}