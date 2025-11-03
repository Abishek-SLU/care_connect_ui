import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/core/service/country/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countryForm!: FormGroup;
  submitted = false;
  jobsArr: any;
  id: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: CountryService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {

    this.countryForm = this.formBuilder.group({
      id: [null],
      countryName: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      countryCode: [null, [Validators.required]],
    });
    this.countryPatch();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  get b() {
    return this.countryForm.controls;
  }
  newcountry(modal: any) {
    // this.modalService.open(modal, {  backdrop: 'static' });
    this.modalService.open(modal, { windowClass: "custom-modal" });

    this.submitted = false;
    this.countryForm.reset({});
  }
  onSubmit(modal: any) {
    this.submitted = true;
    if (this.countryForm.invalid) {
      return;
    } else {
      this.service.countryCreate(this.countryForm.value).subscribe(res => {
        modal.dismiss('Cross click');
        this.countryPatch();
        this.toastr.success(res.data);
        this.countryForm.reset({});
      },
        (err) => {
          this.toastr.error(err.error.error.reason);
        }
      )

    }
  }
  countryPatch() {
    this.spinner.show();
    this.service.countryGet().subscribe((res) => {
      this.jobsArr = res.data;
      this.spinner.hide();
      console.log()
    },
      (err) => {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    )
  }
  onEdit(modal: any, id: any) {
    this.service.countryEdit(id).subscribe((res) => {
      this.countryForm.patchValue({
        id: res.data.id,
        countryName: res.data.countryName,
        shortName: res.data.shortName,
        countryCode: res.data.countryCode,
      })
      this.modalService.open(modal, { windowClass: "custom-modal" });
    })
  }
  deleteModal(modal: any, id: any) {
    this.modalService.open(modal, {  windowClass: "custom-modal" });
    this.id = id;
  }
  onUpdate(modal: any) {
    this.submitted = true;
    if (this.countryForm.invalid) {
      return;
    }
    else {
      this.service.countryUpdate(this.countryForm.value).subscribe((res) => {
        this.toastr.success(res.data);
        modal.dismiss('cross click');
        this.countryPatch();
      },
        (err) => {
          this.toastr.error(err.error.error.reason);
        }
      )
    }
  }
  onDelete(modal: any) {
    this.service.countryDelete(this.id).subscribe((res) => {
      this.toastr.success(res.data);
      this.countryPatch();
      modal.dismiss('Cross click');
    },
      (err) => {
        this.toastr.error(err.error.error.reason)
      }
    )
  }
}
