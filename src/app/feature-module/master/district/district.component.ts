import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
  jobsArr: any[] = [];
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
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

  loadDistricts() {
    this.spinner.show();
    const storedData = localStorage.getItem('districts');
    this.distArr = storedData ? JSON.parse(storedData) : [];
    this.spinner.hide();
  }

  newDistrict(modal: any) {
    this.modalService.open(modal, { windowClass: 'custom-modal' });
    this.submitted = false;
    this.districtForm.reset({});
  }

  onSubmit(modal: any) {
    this.submitted = true;
    if (this.districtForm.invalid) return;

    const data = this.districtForm.value;
    const selectedCountry = this.jobsArr.find((x: any) => x.id == data.countryId);
    const selectedState = this.stateArr.find((x: any) => x.id == data.stateId);

    data.id = new Date().getTime();
    data.countryName = selectedCountry ? selectedCountry.countryName : '';
    data.stateName = selectedState ? selectedState.stateName : '';

    let storedData = localStorage.getItem('districts');
    let districts = storedData ? JSON.parse(storedData) : [];

    districts.push(data);
    localStorage.setItem('districts', JSON.stringify(districts));

    this.toastr.success('District Created Successfully');
    this.loadDistricts();
    modal.dismiss('Cross click');
    this.districtForm.reset({});
  }

  onEdit(modal: any, id: any) {
    const storedData = localStorage.getItem('districts');
    const districts = storedData ? JSON.parse(storedData) : [];
    const record = districts.find((item: any) => item.id === id);

    if (record) {
      const selectedCountryId = record.countryId;
      this.stateArr = this.getStatesByCountry(selectedCountryId);

      this.districtForm.patchValue({
        id: record.id,
        countryId: record.countryId,
        stateId: record.stateId,
        districtName: record.districtName,
        shortName: record.shortName
      });
      this.modalService.open(modal, { windowClass: 'custom-modal' });
    }
  }

  getStatesByCountry(countryId: any) {
    const storedStates = localStorage.getItem('states');
    const allStates = storedStates ? JSON.parse(storedStates) : [];
    return allStates.filter((s: any) => s.countryId == countryId);
  }

  stateGet(event: any) {
    const selectedCountryId = event.target.value;
    this.stateArr = this.getStatesByCountry(selectedCountryId);
  }

  onUpdate(modal: any) {
    this.submitted = true;
    if (this.districtForm.invalid) return;

    const updatedData = this.districtForm.value;
    const selectedCountry = this.jobsArr.find((x: any) => x.id == updatedData.countryId);
    const selectedState = this.stateArr.find((x: any) => x.id == updatedData.stateId);

    updatedData.countryName = selectedCountry ? selectedCountry.countryName : '';
    updatedData.stateName = selectedState ? selectedState.stateName : '';

    let storedData = localStorage.getItem('districts');
    let districts = storedData ? JSON.parse(storedData) : [];

    const index = districts.findIndex((item: any) => item.id === updatedData.id);
    if (index !== -1) {
      districts[index] = updatedData;
      localStorage.setItem('districts', JSON.stringify(districts));
      this.toastr.success('District Updated Successfully');
      this.loadDistricts();
      modal.dismiss('cross click');
    }
  }

  deleteModal(modal: any, id: any) {
    this.modalService.open(modal, { windowClass: 'custom-modal' });
    this.id = id;
  }

  onDelete(modal: any) {
    let storedData = localStorage.getItem('districts');
    let districts = storedData ? JSON.parse(storedData) : [];

    districts = districts.filter((item: any) => item.id !== this.id);
    localStorage.setItem('districts', JSON.stringify(districts));

    this.toastr.success('District Deleted Successfully');
    this.loadDistricts();
    modal.dismiss('Cross click');
  }
}