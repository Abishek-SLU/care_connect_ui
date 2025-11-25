import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private spinner: NgxSpinnerService
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

  loadCountries() {
    this.spinner.show();
    const storedData = localStorage.getItem('countries');
    this.jobsArr = storedData ? JSON.parse(storedData) : [];
    this.spinner.hide();
  }

  newcountry(modal: any) {
    this.modalService.open(modal, { windowClass: "custom-modal" });
    this.submitted = false;
    this.countryForm.reset({});
  }

  onSubmit(modal: any) {
    this.submitted = true;
    if (this.countryForm.invalid) return;

    const data = this.countryForm.value;
    let storedData = localStorage.getItem('countries');
    let countries = storedData ? JSON.parse(storedData) : [];

    data.id = new Date().getTime();
    countries.push(data);
    localStorage.setItem('countries', JSON.stringify(countries));

    this.toastr.success('Country Created Successfully');
    this.loadCountries();
    modal.dismiss('Cross click');
    this.countryForm.reset({});
  }

  onEdit(modal: any, id: any) {
    const storedData = localStorage.getItem('countries');
    const countries = storedData ? JSON.parse(storedData) : [];
    const record = countries.find((item: any) => item.id === id);

    if (record) {
      this.countryForm.patchValue({
        id: record.id,
        countryName: record.countryName,
        shortName: record.shortName,
        countryCode: record.countryCode
      });
      this.modalService.open(modal, { windowClass: "custom-modal" });
    }
  }

  onUpdate(modal: any) {
    this.submitted = true;
    if (this.countryForm.invalid) return;

    const updatedData = this.countryForm.value;
    let storedData = localStorage.getItem('countries');
    let countries = storedData ? JSON.parse(storedData) : [];

    const index = countries.findIndex((item: any) => item.id === updatedData.id);
    if (index !== -1) {
      countries[index] = updatedData;
      localStorage.setItem('countries', JSON.stringify(countries));
      this.toastr.success('Country Updated Successfully');
      this.loadCountries();
      modal.dismiss('cross click');
    }
  }

  deleteModal(modal: any, id: any) {
    this.modalService.open(modal, { windowClass: "custom-modal" });
    this.id = id;
  }

  onDelete(modal: any) {
    let storedData = localStorage.getItem('countries');
    let countries = storedData ? JSON.parse(storedData) : [];

    countries = countries.filter((item: any) => item.id !== this.id);
    localStorage.setItem('countries', JSON.stringify(countries));

    this.toastr.success('Country Deleted Successfully');
    this.loadCountries();
    modal.dismiss('Cross click');
  }
}