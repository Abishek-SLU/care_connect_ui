import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blood-group',
  templateUrl: './blood-group.component.html',
  styleUrls: ['./blood-group.component.css']
})
export class BloodGroupComponent implements OnInit {
  jobsArr: any[] = [];
  bloodGroupform!: FormGroup;
  submitted = false;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.bloodGroupform = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]]
    });
    this.loadBloodGroups();
  }

  get b() {
    return this.bloodGroupform.controls;
  }

  loadBloodGroups() {
    this.spinner.show();
    const storedData = localStorage.getItem('bloodGroups');
    this.jobsArr = storedData ? JSON.parse(storedData) : [];
    this.spinner.hide();
  }

  newBloodGroup(modal: any) {
    this.modalService.open(modal, { windowClass: "custom-modal" });
    this.submitted = false;
    this.bloodGroupform.reset({});
  }

  onSubmit(modal: any) {
    this.submitted = true;
    if (this.bloodGroupform.invalid) return;

    const data = this.bloodGroupform.value;
    let storedData = localStorage.getItem('bloodGroups');
    let bloodGroups = storedData ? JSON.parse(storedData) : [];

    data.id = new Date().getTime();
    bloodGroups.push(data);
    localStorage.setItem('bloodGroups', JSON.stringify(bloodGroups));

    this.toastr.success('Blood Group Created Successfully');
    this.loadBloodGroups();
    modal.dismiss('Cross click');
    this.bloodGroupform.reset({});
  }

  onEdit(modal: any, id: any) {
    const storedData = localStorage.getItem('bloodGroups');
    const bloodGroups = storedData ? JSON.parse(storedData) : [];
    const record = bloodGroups.find((item: any) => item.id === id);

    if (record) {
      this.bloodGroupform.patchValue({
        id: record.id,
        name: record.name
      });
      this.modalService.open(modal, { windowClass: "custom-modal" });
    }
  }

  onUpdate(modal: any) {
    this.submitted = true;
    if (this.bloodGroupform.invalid) return;

    const updatedData = this.bloodGroupform.value;
    let storedData = localStorage.getItem('bloodGroups');
    let bloodGroups = storedData ? JSON.parse(storedData) : [];

    const index = bloodGroups.findIndex((item: any) => item.id === updatedData.id);
    if (index !== -1) {
      bloodGroups[index] = updatedData;
      localStorage.setItem('bloodGroups', JSON.stringify(bloodGroups));
      this.toastr.success('Blood Group Updated Successfully');
      this.loadBloodGroups();
      modal.dismiss('cross click');
    }
  }

  deleteModal(modal: any, id: any) {
    this.modalService.open(modal, { windowClass: "custom-modal" });
    this.id = id;
  }

  onDelete(modal: any) {
    let storedData = localStorage.getItem('bloodGroups');
    let bloodGroups = storedData ? JSON.parse(storedData) : [];

    bloodGroups = bloodGroups.filter((item: any) => item.id !== this.id);
    localStorage.setItem('bloodGroups', JSON.stringify(bloodGroups));

    this.toastr.success('Blood Group Deleted Successfully');
    this.loadBloodGroups();
    modal.dismiss('Cross click');
  }
}