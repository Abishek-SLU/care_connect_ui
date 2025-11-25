import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.css']
})
export class ManageScheduleComponent implements OnInit {

  datefilter!: FormGroup;
  reasonForm!: FormGroup;
  value: any[] = [];
  scheduleId: any;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalservice: NgbModal
  ) {}

  ngOnInit(): void {
    // Default date
    const today = new Date();
    const formatted = today.toISOString().substring(0, 10);
    this.datefilter = this.fb.group({
      date: [formatted, Validators.required],
    });

    this.reasonForm = this.fb.group({
      reason: [null, Validators.required]
    });

    this.loadSchedules();
  }

  // 🔹 Load schedules from localStorage or seed default data
  loadSchedules() {
    const saved = localStorage.getItem('doctorSchedules');
    if (saved) {
      this.value = JSON.parse(saved);
    } else {
      this.value = [
        {
          scheduleId: 'S1',
          date: '2025-11-06',
          startTime: '09:00',
          endTime: '11:00',
          maxPatients: 10,
          scheduleIdCount: 7,
          status: 'ACTIVE',
        },
        {
          scheduleId: 'S2',
          date: '2025-11-06',
          startTime: '11:00',
          endTime: '13:00',
          maxPatients: 8,
          scheduleIdCount: 5,
          status: 'INACTIVE',
        },
        {
          scheduleId: 'S3',
          date: '2025-11-07',
          startTime: '10:00',
          endTime: '12:00',
          maxPatients: 5,
          scheduleIdCount: 2,
          status: 'ACTIVE',
        },
      ];
      localStorage.setItem('doctorSchedules', JSON.stringify(this.value));
    }

    // Filter based on current date
    this.getManageschedule();
  }

  // 🔹 Filter schedules by selected date
  getManageschedule() {
    const selectedDate = this.datefilter.value.date;
    const allSchedules = JSON.parse(localStorage.getItem('doctorSchedules') || '[]');
    this.value = allSchedules.filter((a: any) => a.date === selectedDate);
  }

  // 🔹 Open cancel reason modal
  Reasonmodal(modal: any, data: any) {
    this.scheduleId = data.scheduleId;
    this.modalservice.open(modal, { size: 'md' });
  }

  // 🔹 Activate schedule
  ActiveSchTime(data: any) {
    const allSchedules = JSON.parse(localStorage.getItem('doctorSchedules') || '[]');
    const index = allSchedules.findIndex((a: any) => a.scheduleId === data.scheduleId);
    if (index !== -1) {
      allSchedules[index].status = 'ACTIVE';
      localStorage.setItem('doctorSchedules', JSON.stringify(allSchedules));
      this.toastr.success('Schedule Activated Successfully');
      this.getManageschedule();
    }
  }

  // 🔹 Cancel schedule with reason
  deleteSchTime(modal: any) {
    if (this.reasonForm.invalid) {
      this.toastr.error('Please provide a reason');
      return;
    }

    const reason = this.reasonForm.value.reason;
    const allSchedules = JSON.parse(localStorage.getItem('doctorSchedules') || '[]');
    const index = allSchedules.findIndex((a: any) => a.scheduleId === this.scheduleId);

    if (index !== -1) {
      allSchedules[index].status = 'INACTIVE';
      allSchedules[index].cancelReason = reason;
      localStorage.setItem('doctorSchedules', JSON.stringify(allSchedules));

      this.toastr.success('Schedule Cancelled Successfully');
      this.reasonForm.reset();
      modal.dismiss('Cross click');
      this.getManageschedule();
    }
  }

  // 🔹 Format time (24h → 12h)
  convertTo12HourFormat(time24: string): string {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hourNum = parseInt(hours, 10);
    const isPM = hourNum >= 12;
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minutes} ${isPM ? 'PM' : 'AM'}`;
  }
}