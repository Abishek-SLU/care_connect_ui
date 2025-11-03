import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DistrictService } from 'src/app/core/service/district/district.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  districtForm!: FormGroup;
  submitted = false;
  distArr: any;
  stateArr: any=[];
  jobsArr: any;
  countryId: any;
  id: any;
  cdr: any;
  stateObj:any
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalservice: NgbModal,
    private service: DistrictService,
    private toastr: ToastrService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.districtForm = this.formBuilder.group({
      id: [null],
      countryId:[null,[Validators.required]],
      stateId:[null,[Validators.required]],
      districtName: [null, [Validators.required]],
      shortName: [null, [Validators.required]]
    });
    this.distPatch();
    this.countryPatch();
  }
  get b() {
    return this.districtForm.controls;
  }
  newDistrict(modal: any) {
    this.modalservice.open(modal, {   windowClass: "custom-modal" });
    this.submitted = false;
    this.districtForm.reset({});
  }
  onSubmit(modal: any) {
    this.submitted = true;
    if (this.districtForm.invalid) {
      return;
    } else {
      this.service.distCreate(this.districtForm.value).subscribe((res) => {
        modal.dismiss('cross click');
        this.distPatch();
        this.toastr.success(res.data);
        this.districtForm.reset({});
      },(err) => {
        this.toastr.error(err.error.error.reason);
      })
    }
  }
  distPatch() {
    this.spinner.show();
    this.service.distGet().subscribe((res) => {
      this.distArr = res.data;
      this.spinner.hide();
    })
  }
  
  stateGet(event: any) {
    const selectedCountryId = event.target.value;
    this.service.stateGetAll(selectedCountryId).subscribe(
      (res) => {
        this.stateArr = res.data;
      },
     
    );
  }

  onEdit(modal: any, id: any) {
    this.spinner.show()
    this.service.distEdit(id).subscribe((res) => {
      let Obj = res.data
      this.stateGet({ target: { value: Obj.countryId } });
  this.stateObj=Obj.stateId
      this.districtForm.patchValue({
        id: Obj.id,
        districtName:Obj.districtName,
        shortName:Obj.shortName,
        countryId:Obj.countryId,
        stateId:Obj.stateId
      });
      setTimeout(() => {
        this.modalservice.open(modal, { windowClass: 'custom-modal' });
      }, 800)
      this.spinner.hide()
      
    
    });
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
  onUpdate(modal: any) {
    this.submitted = true;
    if (this.districtForm.invalid) {
      return;
    } else {
      this.service.distUpdate(this.districtForm.value).subscribe(
        (res) => {
          this.toastr.success(res.data);
          modal.dismiss('cross click');
          this.distPatch();
        },
        (err) => {
          console.error('Update Error:', err);
          this.toastr.error(err.error.error.reason);
        }
      );
    }
  }
  
  
  
  deleteModal(modal: any, id: any) {
    this.modalservice.open(modal, {   windowClass: "custom-modal"});
    this.id = id;
  }
  onDelete(modal: any) {
    this.service.distDelete(this.id).subscribe((res) => {
      this.toastr.success(res.data);
      modal.dismiss('cross click');
      this.distPatch();
    },  (err)=>{
      this.toastr.error(err.error.error.reason)
    })
  }
  

}

