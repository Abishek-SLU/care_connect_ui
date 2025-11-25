import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medical-details',
  templateUrl: './medical-details.component.html',
  styleUrls: ['./medical-details.component.css']
})
export class MedicalDetailsComponent implements OnInit {
  medicalList: any[] = [];
  medicalForm!: FormGroup;
  isEdit: boolean = false;
  editIndex: number = -1;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadMedicalData();
  }

  initForm() {
    this.medicalForm = this.fb.group({
      name: ['', Validators.required],
      bmi: ['', Validators.required],
      heartRate: ['', Validators.required],
      fbcStatus: ['', Validators.required],
      weight: ['', Validators.required],
      orderDate: ['', Validators.required],
      orderTime: ['', Validators.required]
    });
  }

  loadMedicalData() {
    const saved = localStorage.getItem('medicalData');
    if (saved) {
      this.medicalList = JSON.parse(saved);
    }
  }

  saveToLocal() {
    localStorage.setItem('medicalData', JSON.stringify(this.medicalList));
  }

  openAddModal() {
    this.isEdit = false;
    this.medicalForm.reset();
  }

  onSubmit() {
    if (this.medicalForm.invalid) {
      this.toastr.warning('Please fill all fields');
      return;
    }

    if (this.isEdit) {
      this.medicalList[this.editIndex] = this.medicalForm.value;
      this.toastr.success('Medical details updated successfully');
    } else {
      this.medicalList.push(this.medicalForm.value);
      this.toastr.success('Medical details added successfully');
    }

    this.saveToLocal();
    this.closeModal();
  }

  onEdit(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.medicalForm.patchValue(this.medicalList[index]);
  }

  onDelete(index: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.medicalList.splice(index, 1);
      this.saveToLocal();
      this.toastr.error('Medical record deleted');
    }
  }

  closeModal() {
    const modal = document.getElementById('modal_medical_form');
    const backdrop = document.querySelector('.modal-backdrop');
    if (modal) (modal as any).classList.remove('show');
    if (backdrop) backdrop.remove();
  }
}