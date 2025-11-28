import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/service/common/common.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  districtForm!: FormGroup;
  submitted = false;
  distArr: any[] = [];
  stateArr: any[] = [];
  allStates: any[] = [];
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
    this.districtForm = this.formBuilder.group({
      id: [null],
      countryId: [null, [Validators.required]],
      stateId: [null, [Validators.required]],
      districtName: [null, [Validators.required]],
      shortName: [null, [Validators.required]]
    });
    this.loadCountries();
    this.loadStates();
    this.loadDistricts();
  }

  get b() {
    return this.districtForm.controls;
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

  loadStates(): void {
    this.spinner.show();
    this.commonService.getState().subscribe({
      next: (res: any) => {
        this.allStates = res?.data || [];
        this.stateArr = [];
        this.spinner.hide();
      },
      error: () => {
        this.allStates = [];
        this.stateArr = [];
        this.spinner.hide();
        this.toastr.error('Failed to load states');
      }
    });
  }

  loadDistricts(): void {
    this.spinner.show();
    this.commonService.getCity().subscribe({
      next: (res: any) => {
        this.distArr = res?.data || [];
        this.spinner.hide();
      },
      error: () => {
        this.distArr = [];
        this.spinner.hide();
        this.toastr.error('Failed to load cities');
      }
    });
  }

  newDistrict(modal: any): void {
    this.submitted = false;
    this.districtForm.reset({ id: null, countryId: null, stateId: null });
    this.stateArr = [];
    this.modalService.open(modal, { windowClass: 'custom-modal' });
  }

  stateGet(event: any): void {
    const selectedCountryId = event.target.value;
    this.stateArr = this.allStates.filter((s: any) => s.countryId === selectedCountryId);
    this.districtForm.get('stateId')?.setValue(null);
  }

  onSubmit(modal: any): void {
    this.submitted = true;
    if (this.districtForm.invalid) return;

    const payload = this.districtForm.value;
    this.spinner.show();

    this.commonService.cityCreate(payload).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success('City created successfully');
        modal.dismiss('close');
        this.districtForm.reset({});
        this.submitted = false;
        this.loadDistricts();
      },
      error: (err: any) => {
        this.spinner.hide();
        this.toastr.error(
          err?.error?.error?.message || err?.error?.message || 'Failed to create city'
        );
      }
    });
  }

  onEdit(modal: any, id: any): void {
    this.spinner.show();
    this.commonService.getCityById(id).subscribe({
      next: (res: any) => {
        const data = res?.data;
        if (data?.countryId) {
          this.stateArr = this.allStates.filter((s: any) => s.countryId === data.countryId);
        }
        this.districtForm.patchValue({
          id: data.id,
          countryId: data.countryId,
          stateId: data.stateId,
          districtName: data.districtName,
          shortName: data.shortName
        });
        this.spinner.hide();
        this.modalService.open(modal, { windowClass: 'custom-modal' });
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Failed to fetch city details');
      }
    });
  }

  onUpdate(modal: any): void {
    this.submitted = true;
    if (this.districtForm.invalid) return;

    const payload = this.districtForm.value;
    this.spinner.show();

    this.commonService.cityUpdate(payload).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success('City updated successfully');
        modal.dismiss('close');
        this.districtForm.reset({});
        this.submitted = false;
        this.loadDistricts();
      },
      error: (err: any) => {
        this.spinner.hide();
        this.toastr.error(
          err?.error?.error?.message || err?.error?.message || 'Failed to update city'
        );
      }
    });
  }

  deleteModal(modal: any, id: any): void {
    this.id = id;
    this.modalService.open(modal, { windowClass: 'custom-modal' });
  }

  onDelete(modal: any): void {
    this.spinner.show();
    this.commonService.cityDelete(this.id).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success('City deleted successfully');
        modal.dismiss('close');
        this.loadDistricts();
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Failed to delete city');
        modal.dismiss('close');
      }
    });
  }
}