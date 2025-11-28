import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/service/common/common.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  stateForm!: FormGroup;
  submitted = false;
  stateArr: any[] = [];
  jobsArr: any[] = [];
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.stateForm = this.formBuilder.group({
      id: [null],
      countryId: [null, [Validators.required]],
      stateName: [null, [Validators.required]],
      shortName: [null, [Validators.required]]
    });
    this.loadCountries();
    this.loadStates();
  }

  get b() {
    return this.stateForm.controls;
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
        this.stateArr = res?.data || [];
        this.spinner.hide();
      },
      error: () => {
        this.stateArr = [];
        this.spinner.hide();
        this.toastr.error('Failed to load states');
      }
    });
  }

  newState(modal: any): void {
    this.submitted = false;
    this.stateForm.reset({ id: null, countryId: null });
    this.modalService.open(modal, { windowClass: 'custom-modal' });
  }

  onSubmit(modal: any): void {
    this.submitted = true;
    if (this.stateForm.invalid) return;

    const payload = this.stateForm.value;
    this.spinner.show();

    this.commonService.stateCreate(payload).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success('State created successfully');
        modal.dismiss('close');
        this.stateForm.reset({});
        this.submitted = false;
        this.loadStates();
      },
      error: (err: any) => {
        this.spinner.hide();
        this.toastr.error(
          err?.error?.error?.message || err?.error?.message || 'Failed to create state'
        );
      }
    });
  }

  onEdit(modal: any, id: any): void {
    this.spinner.show();
    this.commonService.getStateById(id).subscribe({
      next: (res: any) => {
        const data = res?.data;
        this.stateForm.patchValue({
          id: data.id,
          countryId: data.countryId,
          stateName: data.stateName,
          shortName: data.shortName
        });
        this.spinner.hide();
        this.modalService.open(modal, { windowClass: 'custom-modal' });
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Failed to fetch state details');
      }
    });
  }

  onUpdate(modal: any): void {
    this.submitted = true;
    if (this.stateForm.invalid) return;

    const payload = this.stateForm.value;
    this.spinner.show();

    this.commonService.stateUpdate(payload).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success('State updated successfully');
        modal.dismiss('close');
        this.stateForm.reset({});
        this.submitted = false;
        this.loadStates();
      },
      error: (err: any) => {
        this.spinner.hide();
        this.toastr.error(
          err?.error?.error?.message || err?.error?.message || 'Failed to update state'
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
    this.commonService.stateDelete(this.id).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success('State deleted successfully');
        modal.dismiss('close');
        this.loadStates();
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Failed to delete state');
        modal.dismiss('close');
      }
    });
  }
}