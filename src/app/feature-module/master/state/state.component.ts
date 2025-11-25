import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.stateForm = this.formBuilder.group({
      id: [null],
      countryId: [null, [Validators.required]],
      stateName: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
    });
    this.loadCountries();
    this.loadStates();
  }

  get b() {
    return this.stateForm.controls;
  }

  loadCountries() {
    this.spinner.show();
    const storedData = localStorage.getItem('countries');
    this.jobsArr = storedData ? JSON.parse(storedData) : [];
    this.spinner.hide();
  }

  loadStates() {
    this.spinner.show();
    const storedData = localStorage.getItem('states');
    this.stateArr = storedData ? JSON.parse(storedData) : [];
    this.spinner.hide();
  }

  newState(modal: any) {
    this.modalService.open(modal, { windowClass: "custom-modal" });
    this.submitted = false;
    this.stateForm.reset({});
  }

  onSubmit(modal: any) {
    this.submitted = true;
    if (this.stateForm.invalid) return;

    const data = this.stateForm.value;
    const selectedCountry = this.jobsArr.find((x: any) => x.id == data.countryId);
    data.id = new Date().getTime();
    data.countryName = selectedCountry ? selectedCountry.countryName : '';

    let storedData = localStorage.getItem('states');
    let states = storedData ? JSON.parse(storedData) : [];

    states.push(data);
    localStorage.setItem('states', JSON.stringify(states));

    this.toastr.success('State Created Successfully');
    this.loadStates();
    modal.dismiss('Cross click');
    this.stateForm.reset({});
  }

  onEdit(modal: any, id: any) {
    const storedData = localStorage.getItem('states');
    const states = storedData ? JSON.parse(storedData) : [];
    const record = states.find((item: any) => item.id === id);

    if (record) {
      this.stateForm.patchValue({
        id: record.id,
        countryId: record.countryId,
        stateName: record.stateName,
        shortName: record.shortName
      });
      this.modalService.open(modal, { windowClass: "custom-modal" });
    }
  }

  onUpdate(modal: any) {
    this.submitted = true;
    if (this.stateForm.invalid) return;

    const updatedData = this.stateForm.value;
    const selectedCountry = this.jobsArr.find((x: any) => x.id == updatedData.countryId);
    updatedData.countryName = selectedCountry ? selectedCountry.countryName : '';

    let storedData = localStorage.getItem('states');
    let states = storedData ? JSON.parse(storedData) : [];

    const index = states.findIndex((item: any) => item.id === updatedData.id);
    if (index !== -1) {
      states[index] = updatedData;
      localStorage.setItem('states', JSON.stringify(states));
      this.toastr.success('State Updated Successfully');
      this.loadStates();
      modal.dismiss('cross click');
    }
  }

  deleteModal(modal: any, id: any) {
    this.modalService.open(modal, { windowClass: "custom-modal" });
    this.id = id;
  }

  onDelete(modal: any) {
    let storedData = localStorage.getItem('states');
    let states = storedData ? JSON.parse(storedData) : [];

    states = states.filter((item: any) => item.id !== this.id);
    localStorage.setItem('states', JSON.stringify(states));

    this.toastr.success('State Deleted Successfully');
    this.loadStates();
    modal.dismiss('Cross click');
  }
}