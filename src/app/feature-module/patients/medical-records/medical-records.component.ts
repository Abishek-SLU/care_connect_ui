import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MedicalrecordsService } from 'src/app/core/service/medicalrecords/medicalrecords.service';
import { PatientprescriptionService } from 'src/app/core/service/patients/patient prescription/patientprescription.service';
import { CommonService } from 'src/app/core/service/service.index';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent implements OnInit {
  validation = false;
  medicalRecordsForm!: FormGroup;
  medicalRecords: any = [];
  fileName: string = "";
  patientId: any;
  prescriptionData: any = [];
  viewPrescription: any = [];
  formattedDate: any;
  isprescription: boolean = true;
  @ViewChild('fileInput') fileInput: any;
  files: any;
  handleReaderLoaded: any;
  productObj: any;
  constructor(
    private grp: FormBuilder,
    private modalservice: NgbModal,
    private toastr: ToastrService,
    private medicalrecordService: MedicalrecordsService,
    private prescriptionService: PatientprescriptionService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.patientId = this.commonService.userRoleId();
    this.medicalGetIdValue();
    this.prescriptionGetvalue();
    this.medicalRecordsForm = this.grp.group({
      id: [null],
      patientId: [null],
      name: [null, Validators.required],
      hospitalName: [null, Validators.required],
      recordBy: [null, Validators.required],
      file: [null, Validators.required],
      description: [null, Validators.required],
      attachmentName: [null]
    })

  }
  // onFileSelected(event: any) {
  //   const fileInput = event.target; 
  //   this.files = fileInput.files[0];
  // }
  onFileSelected(evt: any) {
    const file = evt.target.files[0];
    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png' ||
      file.type === 'application/pdf'
    ) {
    } else {
      this.toastr.error("Supported file types are (jpeg, jpg, png, pdf)");
      return;
    }
    this.files = file;
  }

  fileDownload(id: any) {
    this.medicalrecordService.downloadFile(id).subscribe((imageBlob: Blob) => {
      const url = window.URL.createObjectURL(imageBlob);
      const a = document.createElement('a');
      a.href = url;
      const fileExtension = id.split('.').pop().toLowerCase();
      if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
        a.download = 'image.jpg';
      } else if (fileExtension === 'pdf') {
        a.download = 'document.pdf';
      } else {
        a.download = 'file';
      }
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  medicalGetIdValue() {
    this.spinner.show();
    this.medicalrecordService.medicalGetId(this.patientId).subscribe(res => {
      this.medicalRecords = res.data;
      this.spinner.hide();
    },
      (err) => {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      })
  }
  favGet: any = [];
  imagearr: any = [];
  prescriptionGetvalue() {
    this.spinner.show();
    this.prescriptionService.prescriptionGet().subscribe(res => {
      this.prescriptionData = res.data;
      this.favGet = this.prescriptionData;
      for (let i = 0; i < this.favGet.length; i++) {
        if (this.favGet[i].doctorImageDTO.doctorImage != null) {
          const doctorData = {
            doctorId: this.favGet[i]?.doctorImageDTO?.doctorId,
            doctorName: this.favGet[i]?.doctorImageDTO?.doctorName,
            doctorImage: atob(this.favGet[i]?.doctorImageDTO?.doctorImage)
          };
          this.favGet[i].doctorData = doctorData;
        }
        this.imagearr.push(this.favGet[i]);
      }
      this.spinner.hide();
    },
      (err) => {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    )
  }
  details: any = [];
  prescriptionDetails(id: any, contant: any) {
    if (this.viewPrescription) {
      this.viewPrescription = [];
    }
    this.modalservice.open(contant, { size: "xl" })
    this.spinner.show();
    this.prescriptionService.prescriptionView(id).subscribe(res => {
      this.viewPrescription = res.data;
      this.details = this.viewPrescription.prescriptionNameDto;
      this.spinner.hide()
    })
  }

  convertMonth(createdDate: string) {
    if (createdDate) {
      const dateParts = createdDate.split('/');
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);
      const dateObject = new Date(year, month, day);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const formattedDate = dateObject.toLocaleDateString('en-US', options);
      return formattedDate;
    } else {
      return '';
    }
  }
  get f() {
    return this.medicalRecordsForm.controls
  }
  submit(modal: any) {
    this.validation = true;
    if (this.medicalRecordsForm.invalid) {
      this.toastr.error('Validation Error');
      return;
    } else {
      const formData = new FormData();
      formData.append('file', this.files);
      formData.append('name', this.medicalRecordsForm.value.name);
      formData.append('patientId', this.patientId);
      formData.append('hospitalName', this.medicalRecordsForm.value.hospitalName);
      formData.append('recordBy', this.medicalRecordsForm.value.recordBy);
      formData.append('description', this.medicalRecordsForm.value.description);
      formData.append('attachmentName ', this.files.name);
      formData.append('id', 'null');

      this.medicalrecordService.medicalCreate(formData).subscribe(
        (response) => {
          this.toastr.success('', 'Submit successfully!');
          modal.dismiss('Cross click');
          this.medicalGetIdValue();
          this.validation = false;
        },
        (error) => {
          console.error('Error uploading file', error);
        }
      );
    }
  }
  deleteId: any;
  deleteModal(id: any, modal: any) {
    this.modalservice.open(modal, { size: "md" });
    this.deleteId = id;
  }
  medicalrecordDelete(modal: any) {
    this.medicalrecordService.medicalDelete(this.deleteId).subscribe(res => {
      this.toastr.error(res.data);
      this.medicalGetIdValue();
    })
    modal.dismiss("cross click")
  }
  openmodal(contant: any) {
    this.validation = false;
    this.modalservice.open(contant, { size: "lg" })
    this.medicalRecordsForm.reset({});
  }
}
