import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/core/service/patients/new-patient/patient.service';
import { CommonService } from 'src/app/core/service/common/common.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  profileForm!: FormGroup;
  imageUrl: string = 'assets/img/patients/patient.jpg';
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private patientService: PatientService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.setupLocationSubscriptions();
    this.loadCountries();
    this.loadProfile();
  }

  initForm(): void {
    const storedUserId = localStorage.getItem('userId');

    this.profileForm = this.fb.group({
      id: [null],
      userId: [storedUserId || null],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNo: [''],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      dateOfBirth: [''],
      bloodGroup: [''],
      addressLine1: [''],
      addressLine2: [''],
      countryId: [null],
      stateId: [null],
      cityId: [null],
      zipcode: ['']
    });
  }

  get countryIdControl() {
    return this.profileForm.get('countryId');
  }

  get stateIdControl() {
    return this.profileForm.get('stateId');
  }

  get cityIdControl() {
    return this.profileForm.get('cityId');
  }

  setupLocationSubscriptions(): void {
    this.countryIdControl?.valueChanges.subscribe((countryId: string) => {
      if (!countryId) {
        this.states = [];
        this.cities = [];
        this.stateIdControl?.setValue(null, { emitEvent: false });
        this.cityIdControl?.setValue(null, { emitEvent: false });
        return;
      }
      this.loadStates(countryId);
      this.stateIdControl?.setValue(null, { emitEvent: false });
      this.cityIdControl?.setValue(null, { emitEvent: false });
    });

    this.stateIdControl?.valueChanges.subscribe((stateId: string) => {
      if (!stateId) {
        this.cities = [];
        this.cityIdControl?.setValue(null, { emitEvent: false });
        return;
      }
      this.loadCities(stateId);
      this.cityIdControl?.setValue(null, { emitEvent: false });
    });
  }

  loadCountries(): void {
    this.commonService.getCountry().subscribe({
      next: (res: any) => {
        this.countries = res.data || res;
      },
      error: () => {
        this.countries = [];
      }
    });
  }

  loadStates(countryId: string): void {
    this.commonService.getState().subscribe({
      next: (res: any) => {
        this.states = res.data || res;
      },
      error: () => {
        this.states = [];
      }
    });
  }

  loadCities(stateId: string): void {
    this.commonService.getCity().subscribe({
      next: (res: any) => {
        this.cities = res.data || res;
      },
      error: () => {
        this.cities = [];
      }
    });
  }

  loadProfile(): void {
    const userId = localStorage.getItem('userId');
    const savedImage = localStorage.getItem('patientProfileImage');

    if (savedImage) {
      this.imageUrl = savedImage;
    }

    if (!userId) {
      return;
    }

    this.patientService.patientGet(userId).subscribe({
      next: (res: any) => {
        const data = res.data as any;
        if (!data) {
          return;
        }

        this.profileForm.patchValue({
          id: data.id || null,
          userId: data.userId || userId,
          firstname: data.firstname,
          lastname: data.lastname,
          phoneNo: data.phoneNo,
          email: data.email,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          bloodGroup: data.bloodGroup,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          countryId: data.countryId,
          stateId: data.stateId,
          cityId: data.cityId,
          zipcode: data.zipcode
        });

        if (data.countryId) {
          this.loadStates(data.countryId);
        }
        if (data.stateId) {
          this.loadCities(data.stateId);
        }
      },
      error: () => {
        this.toastr.error('Unable to load profile');
      }
    });
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.size < 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        localStorage.setItem('patientProfileImage', this.imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      this.toastr.error('File too large! Max 2MB allowed');
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      Object.values(this.profileForm.controls).forEach(ctrl => ctrl.markAsTouched());
      this.toastr.error('Please fill all required fields');
      return;
    }

    const raw = this.profileForm.value;
    const storedUserId = localStorage.getItem('userId');
    const payload = {
      id: raw.id,
      userId: raw.userId || storedUserId,
      firstname: raw.firstname,
      lastname: raw.lastname,
      phoneNo: raw.phoneNo,
      email: raw.email,
      gender: raw.gender,
      dateOfBirth: raw.dateOfBirth,
      bloodGroup: raw.bloodGroup,
      addressLine1: raw.addressLine1,
      addressLine2: raw.addressLine2,
      countryId: raw.countryId,
      stateId: raw.stateId,
      cityId: raw.cityId,
      zipcode: raw.zipcode
    };

    this.patientService.patientCreate(payload).subscribe({
      next: (res: any) => {
        this.toastr.success(res.data?.message || 'Profile updated successfully');
      },
      error: () => {
        this.toastr.error('Failed to save profile');
      }
    });
  }
}