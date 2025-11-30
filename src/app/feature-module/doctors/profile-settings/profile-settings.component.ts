// profile-settings.component.ts
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/core/service/doctors/newDoctor/doctor.service';
import { CommonService } from 'src/app/core/service/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  doctorForm!: FormGroup;
  files: File[] = [];
  removeLastOnBackspace = false;
  canDeleteTags = true;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  isLocationInitializing = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.setupLocationSubscriptions();
    this.loadCountries();
    this.loadProfile();
  }

  buildForm(): void {
    const storedUserId = localStorage.getItem('userId');

    this.doctorForm = this.fb.group({
      id: [null],
      userId: [storedUserId || null],
      // userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNo: [''],
      emergencyNo: [''],
      gender: [''],
      dateOfBirth: [''],
      aboutMe: [''],
      service: [[]],
      specialization: [[]],
      educationArray: [''],
      clinic: this.fb.group({
        id: [null],
        clinicName: [''],
        registerNumber: [''],
        consultFees: [''],
        addressLine1: [''],
        addressLine2: [''],
        countryId: [null],
        stateId: [null],
        cityId: [null],
        zipcode: [''],
        doctorId: [storedUserId || null]
      }),
      educations: this.fb.array([]),
      experiences: this.fb.array([])
    });

    this.addEducation();
    this.addExperience();
  }

  get educations(): FormArray {
    return this.doctorForm.get('educations') as FormArray;
  }

  get experiences(): FormArray {
    return this.doctorForm.get('experiences') as FormArray;
  }

  get clinic(): FormGroup {
    return this.doctorForm.get('clinic') as FormGroup;
  }

  setupLocationSubscriptions(): void {
    const clinicGroup = this.clinic;

    clinicGroup.get('countryId')?.valueChanges.subscribe((countryId: string) => {
      if (this.isLocationInitializing) {
        return;
      }

      if (!countryId) {
        this.states = [];
        this.cities = [];
        clinicGroup.get('stateId')?.setValue(null, { emitEvent: false });
        clinicGroup.get('cityId')?.setValue(null, { emitEvent: false });
        return;
      }

      this.loadStates(countryId);
      clinicGroup.get('stateId')?.setValue(null, { emitEvent: false });
      clinicGroup.get('cityId')?.setValue(null, { emitEvent: false });
    });

    clinicGroup.get('stateId')?.valueChanges.subscribe((stateId: string) => {
      if (this.isLocationInitializing) {
        return;
      }

      if (!stateId) {
        this.cities = [];
        clinicGroup.get('cityId')?.setValue(null, { emitEvent: false });
        return;
      }

      this.loadCities(stateId);
      clinicGroup.get('cityId')?.setValue(null, { emitEvent: false });
    });
  }

  loadCountries(): void {
    this.commonService.getCountry().subscribe({
      next: (res: any) => {
        this.countries = res.data || res || [];
      },
      error: () => {
        this.countries = [];
      }
    });
  }

  loadStates(countryId: string): void {
    this.commonService.getState().subscribe({
      next: (res: any) => {
        this.states = res.data || res || [];
      },
      error: () => {
        this.states = [];
      }
    });
  }

  loadCities(stateId: string): void {
    this.commonService.getCity().subscribe({
      next: (res: any) => {
        this.cities = res.data || res || [];
      },
      error: () => {
        this.cities = [];
      }
    });
  }

  addEducation(): void {
    this.educations.push(
      this.fb.group({
        id: [null],
        degree: [''],
        schoolname: [''],
        cxompletionyear: ['']
      })
    );
  }

  deleteEducation(index: number): void {
    if (this.educations.length > 1) {
      this.educations.removeAt(index);
    }
  }

  addExperience(): void {
    this.experiences.push(
      this.fb.group({
        id: [null],
        hosname: [''],
        from: [''],
        to: [''],
        desig: [''],
        docId: [null]
      })
    );
  }

  deleteExperience(index: number): void {
    if (this.experiences.length > 1) {
      this.experiences.removeAt(index);
    }
  }

  onSelect(event: any): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  private toDateInput(value: any): string | null {
    if (!value) {
      return null;
    }
    const d = new Date(value);
    if (isNaN(d.getTime())) {
      return null;
    }
    return d.toISOString().substring(0, 10);
  }

  private normalizeTagArray(value: any): string[] {
    if (!value) {
      return [];
    }
    if (Array.isArray(value)) {
      return value
        .map((v: any) => (typeof v === 'string' ? v : v.display || v.value || ''))
        .filter((v: string) => !!v);
    }
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) {
        return [];
      }
      try {
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            return parsed
              .map((v: any) => (typeof v === 'string' ? v : v.display || v.value || ''))
              .filter((v: string) => !!v);
          }
        }
      } catch { }
      return trimmed
        .split(',')
        .map(v => v.trim())
        .filter(v => !!v);
    }
    return [];
  }

  loadProfile(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    }

    this.doctorService.doctorGet(userId).subscribe({
      next: (res: any) => {
        const data = res.data as any;

        this.doctorForm.patchValue({
          id: data.id || null,
          userId: data.userId || userId,
          // userName: data.userName,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          phoneNo: data.phoneNo,
          emergencyNo: data.emergencyNo,
          gender: data.gender,
          dateOfBirth: this.toDateInput(data.dateOfBirth),
          aboutMe: data.aboutMe,
          service: this.normalizeTagArray(data.service),
          specialization: this.normalizeTagArray(data.specialization)
        });

        if (data.clinicDetails && data.clinicDetails.length > 0) {
          const c = data.clinicDetails[0];

          this.isLocationInitializing = true;

          this.clinic.patchValue(
            {
              id: c.id,
              clinicName: c.clinicName,
              registerNumber: c.registerNumber,
              consultFees: c.consultFees,
              addressLine1: c.addressLine1,
              addressLine2: c.addressLine2,
              countryId: c.countryId,
              stateId: c.stateId,
              cityId: c.cityId,
              zipcode: c.zipcode,
              doctorId: c.doctorId || data.id || userId
            },
            { emitEvent: false }
          );

          if (c.countryId) {
            this.loadStates(c.countryId);
          }
          if (c.stateId) {
            this.loadCities(c.stateId);
          }

          this.isLocationInitializing = false;
        }

        this.educations.clear();
        if (data.educations && data.educations.length > 0) {
          data.educations.forEach((e: any) => {
            this.educations.push(
              this.fb.group({
                id: [e.id],
                degree: [e.degree],
                schoolname: [e.schoolname],
                cxompletionyear: [e.cxompletionyear]
              })
            );
          });
        } else {
          this.addEducation();
        }

        this.experiences.clear();
        if (data.experiences && data.experiences.length > 0) {
          data.experiences.forEach((ex: any) => {
            this.experiences.push(
              this.fb.group({
                id: [ex.id],
                hosname: [ex.hosname],
                from: [this.toDateInput(ex.from)],
                to: [this.toDateInput(ex.to)],
                desig: [ex.desig],
                docId: [ex.docId]
              })
            );
          });
        } else {
          this.addExperience();
        }
      },
      error: () => {
        this.toastr.error('Unable to load profile');
      }
    });
  }

  onSubmit(): void {
    if (this.doctorForm.invalid) {
      this.markAllAsTouched(this.doctorForm);
      this.toastr.error('Please fill all required fields');
      return;
    }

    const raw = this.doctorForm.value;
    const storedUserId = localStorage.getItem('userId');
    const effectiveUserId = raw.userId || storedUserId;

    const serviceArr: string[] = Array.isArray(raw.service)
      ? raw.service.map((v: any) => (typeof v === 'string' ? v : v.display || v.value || ''))
      : [];

    const specializationArr: string[] = Array.isArray(raw.specialization)
      ? raw.specialization.map((v: any) => (typeof v === 'string' ? v : v.display || v.value || ''))
      : [];

    const payload: any = {
      id: raw.id,
      userId: effectiveUserId,
      // userName: raw.userName,
      email: raw.email,
      firstname: raw.firstname,
      lastname: raw.lastname,
      phoneNo: raw.phoneNo,
      emergencyNo: raw.emergencyNo,
      gender: raw.gender,
      dateOfBirth: raw.dateOfBirth,
      aboutMe: raw.aboutMe,
      service: serviceArr.join(','),
      specialization: specializationArr.join(','),
      educationArray: '',
      educations: raw.educations.map((e: any) => ({
        id: e.id,
        schoolname: e.schoolname,
        degree: e.degree,
        cxompletionyear: e.cxompletionyear,
        docId: e.docId || raw.id
      })),
      experiences: raw.experiences.map((x: any) => ({
        id: x.id,
        hosname: x.hosname,
        from: x.from,
        to: x.to,
        desig: x.desig,
        docId: x.docId || raw.id
      })),
      clinicDetails: [
        {
          id: raw.clinic.id,
          clinicName: raw.clinic.clinicName,
          registerNumber: raw.clinic.registerNumber,
          consultFees: raw.clinic.consultFees,
          addressLine1: raw.clinic.addressLine1,
          addressLine2: raw.clinic.addressLine2,
          countryId: raw.clinic.countryId,
          stateId: raw.clinic.stateId,
          cityId: raw.clinic.cityId,
          zipcode: raw.clinic.zipcode,
          doctorId: raw.clinic.doctorId || raw.id
        }
      ]
    };

    if (payload.id == null || payload.id == '') {
      this.doctorService.doctorCreate(payload).subscribe({
        next: (res: any) => {
          this.toastr.success(res.data?.message || 'Profile updated successfully');
          this.router.navigate(['/doctors/dashboard']);
        },
        error: () => {
          this.toastr.error('Failed to save profile');
        }
      });
    } else {
      this.doctorService.doctorUpdate(payload).subscribe({
        next: (res: any) => {
          this.toastr.success(res.data?.message || 'Profile updated successfully');
          this.router.navigate(['/doctors/dashboard']);
        },
        error: () => {
          this.toastr.error('Failed to save profile');
        }
      });
    }


  }

  private markAllAsTouched(group: FormGroup | FormArray): void {
    Object.values(group.controls).forEach((ctrl: AbstractControl) => {
      if (ctrl instanceof FormGroup || ctrl instanceof FormArray) {
        this.markAllAsTouched(ctrl);
      } else {
        ctrl.markAsTouched();
      }
    });
  }
}