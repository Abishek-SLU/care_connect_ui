import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/service/common/common.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countryForm!: FormGroup;
  submitted = false;
  jobsArr: any[] = [];
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.countryForm = this.formBuilder.group({
      id: [null],
      countryName: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      countryCode: [null, [Validators.required]]
    });

    this.loadCountries();
  }

  get b() {
    return this.countryForm.controls;
  }

  loadCountries(): void {
    this.spinner.show();
    this.commonService.getCountry().subscribe({
      next: (res: any) => {
        this.jobsArr = res?.data || [];
        this.spinner.hide();
      },
      error: () => {
        this.jobsArr = [];
        this.spinner.hide();
        this.toastr.error('Failed to load countries');
      }
    });
  }

  newcountry(modal: any): void {
    this.submitted = false;
    this.countryForm.reset({ id: null });
    this.modalService.open(modal, { windowClass: 'custom-modal' });
  }

  onSubmit(modal: any): void {
    this.submitted = true;
    if (this.countryForm.invalid) return;

    const payload = this.countryForm.value;
    this.spinner.show();

    this.commonService.countryCreate(payload).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.toastr.success('Country created successfully');
        modal.dismiss('close');
        this.countryForm.reset({});
        this.submitted = false;
        this.loadCountries();
      },
      error: (err: any) => {
        this.spinner.hide();
        this.toastr.error(err?.error?.error?.message || 'Failed to create');
      }
    });
  }

  onEdit(modal: any, id: any): void {
    this.spinner.show();

    this.commonService.getCountryById(id).subscribe({
      next: (res: any) => {
        const data = res?.data;

        this.countryForm.patchValue({
          id: data.id,
          countryName: data.countryName,
          shortName: data.shortName,
          countryCode: data.countryCode
        });

        this.spinner.hide();
        this.modalService.open(modal, { windowClass: 'custom-modal' });
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Failed to fetch country details');
      }
    });
  }

  onUpdate(modal: any): void {
    this.submitted = true;
    if (this.countryForm.invalid) return;

    const payload = this.countryForm.value;
    this.spinner.show();

    this.commonService.countryUpdate(payload).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success('Country updated successfully');
        modal.dismiss('close');
        this.countryForm.reset({});
        this.submitted = false;
        this.loadCountries();
      },
      error: (err: any) => {
        this.spinner.hide();
        this.toastr.error(err?.error?.error?.message || 'Failed to update');
      }
    });
  }

  deleteModal(modal: any, id: any): void {
    this.id = id;
    this.modalService.open(modal, { windowClass: 'custom-modal' });
  }

  onDelete(modal: any): void {
    this.spinner.show();

    this.commonService.countryDelete(this.id).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success('Country deleted successfully');
        modal.dismiss('close');
        this.loadCountries();
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Failed to delete country');
        modal.dismiss('close');
      }
    });
  }
}