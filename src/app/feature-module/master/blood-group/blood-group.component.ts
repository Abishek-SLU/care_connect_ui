import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BloodgroupService } from 'src/app/core/service/bloodgroup/bloodgroup.service';

@Component({
  selector: 'app-blood-group',
  templateUrl: './blood-group.component.html',
  styleUrls: ['./blood-group.component.css']
})
export class BloodGroupComponent implements OnInit {
  jobsArr: any;
  bloodGroupform!: FormGroup;
  submitted = false;
  id: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: BloodgroupService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.bloodGroupform = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      // status:'ACTIVE'
      // status: [null, [Validators.required]]
    })
    this.bloodgroupPatch();


  }
  get b() {
    return this.bloodGroupform.controls;
  }
  newBloodGroup(modal: any) {
    this.modalService.open(modal,{   windowClass: "custom-modal" });
    this.submitted = false;
    this.bloodGroupform.reset({});
  }
  onSubmit(modal: any) {
    this.submitted = true;
    if (this.bloodGroupform.invalid) {
      return;
    } else {
      this.service.bloodgroupCreate(this.bloodGroupform.value).subscribe(res => {
        modal.dismiss('Cross click');
        this.bloodgroupPatch();
        this.toastr.success(res.data);
        this.bloodGroupform.reset({});
      },
        (err) => {
          this.toastr.error(err.error.error.reason);
        }
      )

    }
  }
  bloodgroupPatch() {
    this.spinner.show();
    this.service.bloodgroupGet().subscribe((res) => {
      this.jobsArr = res.data;
      this.spinner.hide();
      console.log(this.jobsArr)
    }, (err) => {
      this.toastr.error(err.error.error.reason);
      this.spinner.hide();
    }
    )
  }
  onEdit(modal: any, id: any) {
    this.service.bloodgroupEdit(id).subscribe((res) => {
      this.bloodGroupform.patchValue({
        id: res.data.id,
        name: res.data.name,
       
      })
      this.modalService.open(modal, { windowClass: "custom-modal"});
    })
  }
  deleteModal(modal: any, id: any) {
    this.modalService.open(modal, { windowClass: "custom-modal"});
    this.id = id;
  }
  onUpdate(modal: any) {
    this.submitted = true;
    if (this.bloodGroupform.invalid) {
      return;
    }
    else {
      this.service.bloodgroupUpdate(this.bloodGroupform.value).subscribe((res) => {
        this.toastr.success(res.data);
        modal.dismiss('cross click');
        this.bloodgroupPatch();
      },
        (err) => {
          this.toastr.error(err.error.error.reason);
        }
      )
    }
  }
  onDelete(modal: any) {
    this.service.bloodgroupDelete(this.id).subscribe((res) => {
      this.toastr.success(res.data);
      this.bloodgroupPatch();
      modal.dismiss('Cross click');
    },
      (err) => {
        this.toastr.error(err.error.error.reason)
      }
    )
  }
}
