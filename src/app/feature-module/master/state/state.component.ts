import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StateService } from 'src/app/core/service/state/state.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  stateForm!: FormGroup;
  submitted = false;
  stateArr: any
  countryId: any = [];
  countryArr:any;
  id: any;
  selectedCountryId: any;
  jobsArr:any;
  countryGet:any;
  distArr:any;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private service: StateService,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.modalService.dismissAll()
    this.stateForm = this.formBuilder.group({
      id: [null],
      countryId: [null, [Validators.required]],
      stateName: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
    })
    this.statePatch();
this. countryPatch()
  }
  get b() {
    return this.stateForm.controls;
  }
  
  newState(modal: any) {
    this.modalService.open(modal,{  windowClass: "custom-modal"})
    this.submitted = false;
    this.stateForm.reset({});
  }
  onSubmit(modal: any) {
    this.submitted = true;
    if (this.stateForm.invalid) {
      return;
    } else {
      this.service.stateCreate(this.stateForm.value).subscribe((res) => {
        modal.dismiss('cross click');
        this.statePatch();
        this.toastr.success(res.data);
        this.stateForm.reset({});
      },(err)=>{
        this.toastr.error(err.error.error.reason);
      }
      )
    }
  }
  statePatch() {
    this.service.stateGet().subscribe((res) => {
      this.stateArr = res.data;
    })
  }
  onEdit(modal: any, id: any) {
    this.service.stateEdit(id).subscribe((res) => {
      this.countryId = res.data.countryId, 
        this.stateForm.patchValue({
          id: res.data.id,
          countryId: res.data.countryId,
          stateName: res.data.stateName,
          shortName: res.data.shortName,
        })
    })
    this.modalService.open(modal,{  windowClass: "custom-modal" });
  }
  onUpdate(modal: any) {
    this.submitted = true;
    if (this.stateForm.invalid) {
      return;
    } else {
      this.spinner.show();
      this.service.stateUpdate(this.stateForm.value).subscribe((res) => {
        this.toastr.success(res.data);
        modal.dismiss('cross click');
        this.statePatch();
        this.spinner.hide();
      }, (err)=>{
        this.toastr.error(err.error.error.reason);
      })
    }
  }
  deleteModal(modal: any, id: any) {
    const modalRef = this.modalService.open(modal, { windowClass: "custom-modal" });
    this.id = id;
  }
  onDelete(modal: any) {
    this.service.stateDelete(this.id).subscribe((res) => {
      this.toastr.success(res.data);
      modal.dismiss('cross click');
      this.statePatch();
    }, (err)=>{
      this.toastr.error(err.error.error.reason)
    })
  }
  countryPatch() {
    this.spinner.show();
    this.service.countryGet().subscribe((res) => {
      this.jobsArr = res.data;
      this.spinner.hide();
      console.log()
    },  (err)=>{
      this.toastr.error(err.error.error.reason);
      this.spinner.hide();
    }
    )
  }
  stateCountry() {
    if (this.countryId! = this.stateForm.value.id) {
      this.stateForm.patchValue({
        countryId: this.countryId,
      })
    }
  }

}
