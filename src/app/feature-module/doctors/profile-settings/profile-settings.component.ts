import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ishidden = false;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

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
      userName: ['', Validators.required],
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

  pricingOption(event: any): void {
    const pricetype = event.target.value;
    this.ishidden = pricetype !== 'price_free';
    if (!this.ishidden) {
      this.clinic.get('consultFees')?.setValue('');
    }
  }

  onSelect(event: any): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
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
          userName: data.userName,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          phoneNo: data.phoneNo,
          emergencyNo: data.emergencyNo,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          aboutMe: data.aboutMe,
          service: data.service ? data.service.split(',') : [],
          specialization: data.specialization ? data.specialization.split(',') : []
        });

        if (data.clinicDetails && data.clinicDetails.length > 0) {
          const c = data.clinicDetails[0];
          this.clinic.patchValue({
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
          });

          if (c.countryId) {
            this.loadStates(c.countryId);
          }
          if (c.stateId) {
            this.loadCities(c.stateId);
          }
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
                from: [ex.from],
                to: [ex.to],
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
      this.doctrFormMarkAllAsTouched();
      this.toastr.error('Please fill all required fields');
      return;
    }

    const raw = this.doctorForm.value;
    const storedUserId = localStorage.getItem('userId');
    const effectiveUserId = raw.userId || storedUserId;

    const payload: any = {
      id: raw.id,
      userId: effectiveUserId,
      userName: raw.userName,
      email: raw.email,
      firstname: raw.firstname,
      lastname: raw.lastname,
      phoneNo: raw.phoneNo,
      emergencyNo: raw.emergencyNo,
      gender: raw.gender,
      dateOfBirth: raw.dateOfBirth,
      aboutMe: raw.aboutMe,
      service: Array.isArray(raw.service) ? raw.service.join(',') : raw.service,
      specialization: Array.isArray(raw.specialization)
        ? raw.specialization.join(',')
        : raw.specialization,
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

    this.doctorService.doctorCreate(payload).subscribe({
      next: (res: any) => {
        this.toastr.success(res.data?.message || 'Profile updated successfully');
        this.router.navigate(['/doctors/dashboard']);
      },
      error: () => {
        this.toastr.error('Failed to save profile');
      }
    });
  }

  doctrFormMarkAllAsTouched(): void {
    Object.values(this.doctorForm.controls).forEach(ctrl => {
      if (ctrl instanceof FormArray || ctrl instanceof FormGroup) {
        Object.values(ctrl.controls).forEach(c => c.markAsTouched());
      } else {
        ctrl.markAsTouched();
      }
    });
  }
}