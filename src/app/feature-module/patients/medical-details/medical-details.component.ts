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
  value: any = [];
  obj: any;
  bmi: any;
  constructor(
    private mdForm: FormBuilder,
    private modalservice: NgbModal,
    private toastr: ToastrService,
    private service: MedicaldetailsService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService
  ) { }
  ngOnInit(): void {
    this.patientId = this.commonService.userRoleId();
    console.log(this.patientId);
    this.medicalDetailForm = this.mdForm.group({
      id: [null],
      patientId: [null],
      bmi: [null, [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      heartRate: [null, [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      weight: [null, [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      fbcStatus: [null, [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      // orderDate: [null, Validators.required],
      status: "ACTIVE"
    })
    this.getMedicalDetails();
  }
  get f() {
    return this.medicalDetailForm.controls
  }

  patientId: any;

  getMedicalDetails() {
    this.spinner.show();
    this.service.medicalDetailsGet(this.patientId).subscribe(res => {
      this.value = res.data
      this.spinner.hide();
      // this.toastr.success(res.message)
    }, (err) => {
      this.toastr.error(err.error.error.reason);
      this.spinner.hide();
    })
  }
  getByIdDate(date: any) {
    let objDate = date.split("/");
    let obj = objDate[2] + "-" + objDate[1] + "-" + objDate[0];
    return obj;
  }
  getEdit(id: any, modal: any) {
    this.modalservice.open(modal, { size: "md" });
    this.service.medicalDetailsGetById(id).subscribe(res => {
      console.log(res.data);
      this.medicalDetailForm.patchValue({
        id: res.data.id,
        fullName: res.data.fullName,
        bmi: res.data.bmi,
        heartRate: res.data.heartrate,
        weight: res.data.weight,
        fbcStatus: res.data.fbcstatus,
        // orderDate: this.getByIdDate(res.data[0].orderDate),
        patientId: res.data.patientId,
        // status:res.data.status
      })
    })
  }
  deleteId: any;
  deleteModal(id: any, modal: any) {
    this.modalservice.open(modal, { size: "md" });
    this.deleteId = id;
  }
  getDelete(modal: any) {
    this.service.medicalDetailsdelete(this.deleteId).subscribe(res => {
      this.getMedicalDetails();
      this.toastr.error(res.data)
    })
    modal.dismiss('cross click');
  }
  getByIdDates(date: any) {
    let objDate = date.split("-");
    let obj = objDate[0] + "/" + objDate[1] + "/" + objDate[2];
    return obj;
  }
  getUpdate(modal: any) {
    this.validation = true;
    let obj = this.medicalDetailForm.value;
    obj.patientId = this.patientId;
    obj.status = "ACTIVE";
    // obj.orderDate = this.getDate(this.medicalDetailForm.value.orderDate)

    if (this.medicalDetailForm.invalid) {
      return
    } else {
      this.service.medicalDetailsUpdate(this.medicalDetailForm.value).subscribe(res => {
        this.getMedicalDetails();
        this.medicalDetailForm.reset({});
        modal.dismiss('cross click');
        this.toastr.success(res.data)
      })
    }
  }
  // getDate(date: any) {
  //   let objDate = date.split("-");
  //   let obj = objDate[0] + "/" + objDate[1] + "/" + objDate[2];
  //   return obj;
  // }
  submit(modal: any) {
    this.validation = true;
    let obj = this.medicalDetailForm.value;
    obj.patientId = this.patientId;
    obj.status = "ACTIVE";
    // obj.orderDate = this.getDate(this.medicalDetailForm.value.orderDate)
    if (this.medicalDetailForm.invalid) {
      this.toastr.error('Please fill in all required fields.', 'Validation Error!');
      return
    } else {
      this.service.medicalDetailsCreate(this.medicalDetailForm.value).subscribe(res => {
        console.log(res);
        this.getMedicalDetails();
        this.toastr.success(res.data);
        modal.dismiss('Cross click')
      })
    }
  }
  openmodal(contant: any) {
    this.validation = false;
    this.modalservice.open(contant, { size: "md" });
    this.medicalDetailForm.reset({});
  }
  getMaxDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  // onInput(event: any) {
  //   const inputValue = event.target.value;
  //   console.log(inputValue);

  //   const numericValue = inputValue.replace(/[^0-9]/g, '');
  //   console.log(numericValue);

  //     event.target.value = numericValue;
  //     this.medicalDetailForm.controls['bmi'].setValue(numericValue);
  // }
  onInput(event: any) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '').substring(0, 3); // Limit to 10 digits
    event.target.value = numericValue;
    this.medicalDetailForm.controls['bmi'].setValue(numericValue);
  }
  onInput1(event: any) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '').substring(0, 3); // Limit to 10 digits
    event.target.value = numericValue;
    this.medicalDetailForm.controls['heartRate'].setValue(numericValue);
  }
  onInput2(event: any) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '').substring(0, 3); // Limit to 10 digits
    event.target.value = numericValue;
    this.medicalDetailForm.controls['weight'].setValue(numericValue);
  }
  onInput3(event: any) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '').substring(0, 3); // Limit to 10 digits
    event.target.value = numericValue;
    this.medicalDetailForm.controls['fbcStatus'].setValue(numericValue);
  }
}