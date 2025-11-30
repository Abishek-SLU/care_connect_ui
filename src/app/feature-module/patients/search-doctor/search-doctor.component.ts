import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/core/service/service.index';
import { SearchDoctorService } from 'src/app/core/service/patients/searchDoctor/search-doctor.service';

@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.css']
})
export class SearchDoctorComponent implements OnInit {
  doctors: any[] = [];
  specialityList: any[] = [];

  selectedGender: string | null = null;
  selectedSpecializations: string[] = [];
  selDate: NgbDateStruct | null = null;
  locationFilter = '';
  searchKey = '';

  images = [
    { path: 'assets/img/features/feature-01.jpg' },
    { path: 'assets/img/features/feature-02.jpg' },
    { path: 'assets/img/features/feature-03.jpg' },
    { path: 'assets/img/features/feature-04.jpg' }
  ];

  constructor(
    private searchDoctorService: SearchDoctorService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDoctors();
    this.getSpeciality();
  }

  getDoctors(): void {
    this.searchDoctorService.getAllSearchDoctors().subscribe(res => {
      const data = res && res.data ? res.data : res;
      this.doctors = (data || []).map((d: any) => ({
        ...d,
        location: this.buildLocation(d)
      }));
    });
  }

  getSpeciality(): void {
    this.commonService.getSpeciality().subscribe(res => {
      this.specialityList = res as any[];
    });
  }

  onDateSelect(date: NgbDateStruct): void {
    this.selDate = date;
  }

  checkType(event: any): void {
    const checked = event.target.checked;
    const value = event.target.value;
    if (checked) {
      this.selectedGender = value;
    } else if (this.selectedGender === value) {
      this.selectedGender = null;
    }
  }

  checkSpeciality(event: any): void {
    const checked = event.target.checked;
    const value = event.target.value;

    if (checked) {
      this.selectedSpecializations = [value];
    } else {
      this.selectedSpecializations = [];
    }

    const filter = this.specialityList.filter((a: any) => a.speciality === value);
    if (filter.length !== 0) {
      filter[0].checked = checked;
    }
    this.specialityList.forEach((index: any) => {
      if (index.speciality !== value) {
        index.checked = false;
      }
    });
  }

  search(): void {
    const payload: any = {
      date: this.selDate
        ? this.toIsoDate(this.selDate)
        : null,
      gender: this.selectedGender ? [this.selectedGender] : [],
      specialization: this.selectedSpecializations.length ? this.selectedSpecializations : null,
      location: this.locationFilter ? this.locationFilter.trim() : '',
      searchKey: this.searchKey ? this.searchKey.trim() : ''
    };

    this.searchDoctorService.searchDoctors(payload).subscribe(res => {
      const data = res && res.data ? res.data : res;
      this.doctors = (data || []).map((d: any) => ({
        ...d,
        location: this.buildLocation(d)
      }));
    });
  }

  bookAppointment(id: string): void {
    this.router.navigateByUrl('/patients/booking?id=' + id);
  }

  private toIsoDate(date: NgbDateStruct): string {
    const y = date.year.toString();
    const m = date.month.toString().padStart(2, '0');
    const d = date.day.toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private buildLocation(d: any): string {
    const parts: string[] = [];
    if (d.clinicAddressLine1) {
      parts.push(d.clinicAddressLine1);
    }
    if (d.clinicAddressLine2) {
      parts.push(d.clinicAddressLine2);
    }
    if (d.clinicZipcode) {
      parts.push(d.clinicZipcode);
    }
    return parts.join(', ');
  }
}