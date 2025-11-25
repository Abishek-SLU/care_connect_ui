import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  profileForm!: FormGroup;
  imageUrl: string = 'assets/img/patients/patient.jpg';

  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadProfile();
  }

  initForm() {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      dob: [''],
      bloodGroup: [''],
      email: [''],
      mobile: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      country: ['']
    });
  }

  loadProfile() {
    const savedProfile = localStorage.getItem('profileData');
    const savedImage = localStorage.getItem('profileImage');
    if (savedProfile) {
      this.profileForm.patchValue(JSON.parse(savedProfile));
    }
    if (savedImage) {
      this.imageUrl = savedImage;
    }
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file && file.size < 2 * 1024 * 1024) { // <2MB
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        localStorage.setItem('profileImage', this.imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      this.toastr.error('File too large! Max 2MB allowed');
    }
  }

  onSubmit() {
    localStorage.setItem('profileData', JSON.stringify(this.profileForm.value));
    this.toastr.success('Profile saved successfully!');
  }
}