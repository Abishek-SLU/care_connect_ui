import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DocScheduleTimingService } from 'src/app/core/service/doctors/doctor-scheduleTiming/doc-schedule-timing.service';
import { forkJoin, of } from 'rxjs';

type BackendSchedule = {
  id: string;
  doctorId: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  maxPatient: number;
};

type ScheduleItemPayload = {
  doctorId: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  maxPatient: number;
};

@Component({
  selector: 'app-schedule-timing',
  templateUrl: './schedule-timing.component.html',
  styleUrls: ['./schedule-timing.component.css'],
  providers: [DatePipe]
})
export class ScheduleTimingComponent implements OnInit {
  addTimeSlotForm!: FormGroup;
  isAddTime = false;
  showRequiredMessage = false;
  validation = false;
  submitted = false;

  activeIndex = 0;
  doctorId: any;

  weekDayAll: any;
  weekDay: any;
  day: any;
  date: any;
  dateArr: any[] = [];
  currentDate: any;
  dayGet: any;
  currentTime: any;
  getCurrentTime: any;

  sundaySchedule: BackendSchedule[] = [];
  mondaySchedule: BackendSchedule[] = [];
  tuesdaySchedule: BackendSchedule[] = [];
  wednesdaySchedule: BackendSchedule[] = [];
  thursdaySchedule: BackendSchedule[] = [];
  fridaySchedule: BackendSchedule[] = [];
  saturdaySchedule: BackendSchedule[] = [];

  dateCurrent: any;
  currentDayForModal: string | null = null;
  editingSchedules: BackendSchedule[] = [];
  isEditMode = false;

  constructor(
    private modalservice: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe,
    private docScheduleService: DocScheduleTimingService
  ) { }

  ngOnInit(): void {
    this.doctorId = localStorage.getItem('id') || '';
    this.bootstrapDates();
    this.buildForm();
    this.getDocSchedule();
    this.dateGet(this.currentDate, this.dayGet);
  }

  private bootstrapDates() {
    const now = new Date();
    this.getCurrentTime =
      now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');
    this.currentTime =
      now.getHours() +
      ':' +
      now.getMinutes().toString().padStart(2, '0') +
      ':' +
      now.getSeconds().toString().padStart(2, '0');
    this.currentDate = now.toLocaleDateString('en-us');
    this.dayGet = now
      .toLocaleDateString('en-us', { weekday: 'long' })
      .toUpperCase();
    this.weekDay = this.dayGet;

    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      this.day = d.toLocaleDateString('en-us', {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
      const [weekday, date] = this.day.split(', ');
      this.weekDayAll = weekday.toUpperCase();
      this.dateArr.push({ date, weekday: this.weekDayAll });
    }
  }

  private buildForm() {
    this.addTimeSlotForm = this.fb.group({
      doctorId: [this.doctorId],
      day: [null],
      date: [null],
      drScheduleObj: this.fb.array([this.createAddTimeSlot()])
    });
  }

  get addTimeSlotInfo(): FormArray {
    return this.addTimeSlotForm.get('drScheduleObj') as FormArray;
  }

  private createAddTimeSlot(): FormGroup {
    return this.fb.group({
      id: [null],
      maxPatients: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    });
  }

  setActiveDate(index: number) {
    this.activeIndex = index;
  }

  openModal(tpl: any) {
    this.dateCurrent = this.date;
    this.validation = false;
    this.showRequiredMessage = false;
    this.isEditMode = false;
    this.currentDayForModal = this.dayGet;
    this.editingSchedules = [];
    while (this.addTimeSlotInfo.length) {
      this.addTimeSlotInfo.removeAt(0);
    }
    this.addTimeSlotForm.reset({});
    this.addTimeSlotForm.patchValue({
      doctorId: this.doctorId,
      day: this.currentDayForModal,
      date: this.date
    });
    this.addClinicButton();
    this.modalservice.open(tpl, { size: 'lg' });
  }

  openEditModal(day: string, tpl: any) {
    this.currentDayForModal = day;
    this.isEditMode = true;
    this.validation = false;
    this.showRequiredMessage = false;

    const schedules = this.getDayArray(day);
    this.editingSchedules = schedules;

    if (!schedules.length) {
      this.toastr.error('No schedule found for this day');
      return;
    }

    const first = schedules[0];
    this.date = this.formatDisplayDate(first.date);
    this.dateCurrent = this.date;

    while (this.addTimeSlotInfo.length) {
      this.addTimeSlotInfo.removeAt(0);
    }
    this.addTimeSlotForm.reset({});

    this.addTimeSlotForm.patchValue({
      doctorId: this.doctorId,
      day: day,
      date: this.date
    });

    schedules.forEach(() => this.addTimeSlotInfo.push(this.createAddTimeSlot()));
    schedules.forEach((s, i) => {
      const [sH, sM] = s.startTime.split(':');
      const [eH, eM] = s.endTime.split(':');
      this.addTimeSlotInfo.at(i).patchValue({
        id: s.id,
        maxPatients: s.maxPatient,
        startTime: `${sH}:${sM}`,
        endTime: `${eH}:${eM}`
      });
    });

    this.modalservice.open(tpl, { size: 'lg' });
  }

  addClinicButton() {
    this.validation = false;
    this.showRequiredMessage = false;
    this.addTimeSlotInfo.push(this.createAddTimeSlot());
  }

  deleteSlot(index: number, modal: any) {
    const group = this.addTimeSlotInfo.at(index) as FormGroup;
    const id = group.get('id')?.value;

    if (id) {
      this.docScheduleService.deleteSchedule(id).subscribe(
        () => {
          this.toastr.success('Slot deleted');
          this.addTimeSlotInfo.removeAt(index);
          this.getDocSchedule();
          modal.dismiss('cross click');

        },
        () => {
          this.toastr.error('Error deleting slot');
        }
      );
    } else {
      if (this.addTimeSlotInfo.length > 1) {
        this.addTimeSlotInfo.removeAt(index);
      } else {
        group.reset({
          id: null,
          maxPatients: null,
          startTime: null,
          endTime: null
        });
      }
    }
  }

  dateGet(date: any, day: any) {
    this.date = date;
    this.dayGet = day;
    this.weekDay = day;
  }

  private formatDateForPayload(displayDate: string): string {
    if (!displayDate) {
      return '';
    }
    const parts = displayDate.split('/');
    if (parts.length !== 3) {
      return displayDate;
    }
    const mm = parts[0].padStart(2, '0');
    const dd = parts[1].padStart(2, '0');
    const yyyy = parts[2];
    return `${yyyy}-${mm}-${dd}`;
  }

  private formatDisplayDate(apiDate: string): string {
    if (!apiDate) {
      return '';
    }
    const parts = apiDate.split('-');
    if (parts.length !== 3) {
      return apiDate;
    }
    const yyyy = parts[0];
    const mm = parts[1];
    const dd = parts[2];
    return `${mm}/${dd}/${yyyy}`;
  }

  convertTo12HourFormat(time24: string): string {
    if (!time24) {
      return '';
    }
    const parts = time24.split(':');
    if (parts.length < 2) {
      return time24;
    }
    const hours = parts[0];
    const minutes = parts[1];
    const hour = parseInt(hours, 10);
    const isPM = hour >= 12;
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const period = isPM ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${period}`;
  }

  passTime(e: any, i: number) {
    const time = e.target.value as string;
    const date = this.date;
    const now = new Date();
    const currentTime =
      now.getHours().toString().padStart(2, '0') +
      ':' +
      now.getMinutes().toString().padStart(2, '0');

    const ctrl = this.addTimeSlotInfo.at(i).get('startTime');
    if (!ctrl) {
      return;
    }

    if (time) {
      if (this.currentDate === date && currentTime >= time) {
        this.toastr.error('Time has finished, Choose another Time');
        ctrl.setValue('');
        ctrl.setErrors({ required: true });
      } else {
        ctrl.setErrors(null);
      }
    }
  }

  passEndTime(e: any, i: number) {
    const time = e.target.value as string;
    const date = this.date;
    const now = new Date();
    const currentTime =
      now.getHours().toString().padStart(2, '0') +
      ':' +
      now.getMinutes().toString().padStart(2, '0');

    const ctrl = this.addTimeSlotInfo.at(i).get('endTime');
    if (!ctrl) {
      return;
    }

    if (time) {
      if (this.currentDate === date && currentTime >= time) {
        this.toastr.error('Time has finished, Choose another Time');
        ctrl.setValue('');
        ctrl.setErrors({ required: true });
      } else {
        ctrl.setErrors(null);
      }
    }
  }

  saveChanges(modal: any) {
    this.validation = true;

    const day = this.currentDayForModal || this.dayGet;
    const dateDisplay = this.date;
    const dateForPayload = this.formatDateForPayload(dateDisplay);

    if (!day || !dateForPayload) {
      this.toastr.error('Day or Date missing');
      return;
    }

    const scheduleArray = this.addTimeSlotInfo.controls;
    if (!scheduleArray.length) {
      this.toastr.error('Add at least one slot');
      return;
    }

    const payloadItems: { ctrlId: string | null; item: ScheduleItemPayload }[] = [];

    for (let i = 0; i < scheduleArray.length; i++) {
      const group = scheduleArray[i] as FormGroup;
      const startTime = group.get('startTime')?.value;
      const endTime = group.get('endTime')?.value;
      const maxPatients = group.get('maxPatients')?.value;

      if (!startTime || !endTime || !maxPatients) {
        this.toastr.error('Please complete all fields.');
        return;
      }

      const [sH, sM] = startTime.split(':');
      const [eH, eM] = endTime.split(':');
      const startTimeFull = `${sH}:${sM}:00`;
      const endTimeFull = `${eH}:${eM}:00`;

      if (endTimeFull <= startTimeFull) {
        this.toastr.error('End time must be after Start time.');
        return;
      }

      const ctrlId = group.get('id')?.value || null;

      payloadItems.push({
        ctrlId,
        item: {
          doctorId: this.doctorId,
          day: day,
          date: dateForPayload,
          startTime: startTimeFull,
          endTime: endTimeFull,
          maxPatient: Number(maxPatients)
        }
      });
    }

    if (!this.isEditMode) {
      const body = {
        schedules: payloadItems.map((p) => p.item)
      };
      this.docScheduleService.createSchedules(body).subscribe(
        () => {
          this.toastr.success('Schedule created');
          this.addTimeSlotForm.reset({});
          modal.dismiss('cross click');
          this.getDocSchedule();
        },
        () => {
          this.toastr.error('Error creating schedule');
        }
      );
      return;
    }

    const updates = payloadItems
      .filter((p) => p.ctrlId)
      .map((p) =>
        this.docScheduleService.updateSchedule(p.ctrlId as string, p.item)
      );
    const newItems = payloadItems.filter((p) => !p.ctrlId).map((p) => p.item);

    const update$ = updates.length ? forkJoin(updates) : of(null);
    const create$ = newItems.length
      ? this.docScheduleService.createSchedules({ schedules: newItems })
      : of(null);

    forkJoin([update$, create$]).subscribe(
      () => {
        this.toastr.success('Schedule saved');
        this.addTimeSlotForm.reset({});
        modal.dismiss('cross click');
        this.editingSchedules = [];
        this.isEditMode = false;
        this.getDocSchedule();
      },
      () => {
        this.toastr.error('Error saving schedule');
      }
    );
  }

  private getDayArray(day: string): BackendSchedule[] {
    switch (day) {
      case 'SUNDAY':
        return this.sundaySchedule;
      case 'MONDAY':
        return this.mondaySchedule;
      case 'TUESDAY':
        return this.tuesdaySchedule;
      case 'WEDNESDAY':
        return this.wednesdaySchedule;
      case 'THURSDAY':
        return this.thursdaySchedule;
      case 'FRIDAY':
        return this.fridaySchedule;
      case 'SATURDAY':
        return this.saturdaySchedule;
      default:
        return [];
    }
  }

  getDocSchedule() {
    this.docScheduleService.getSchedules(this.doctorId).subscribe(
      (res: any) => {
        let raw = res;
        if (res && res.data) {
          raw = res.data;
        }
        let list: BackendSchedule[] = [];
        if (Array.isArray(raw)) {
          list = raw;
        } else if (raw && raw.content && Array.isArray(raw.content)) {
          list = raw.content;
        }

        const doctorSchedules = list.filter(
          (s) => s.doctorId === this.doctorId
        );

        this.sundaySchedule = doctorSchedules.filter(
          (d) => d.day === 'SUNDAY'
        );
        this.mondaySchedule = doctorSchedules.filter(
          (d) => d.day === 'MONDAY'
        );
        this.tuesdaySchedule = doctorSchedules.filter(
          (d) => d.day === 'TUESDAY'
        );
        this.wednesdaySchedule = doctorSchedules.filter(
          (d) => d.day === 'WEDNESDAY'
        );
        this.thursdaySchedule = doctorSchedules.filter(
          (d) => d.day === 'THURSDAY'
        );
        this.fridaySchedule = doctorSchedules.filter(
          (d) => d.day === 'FRIDAY'
        );
        this.saturdaySchedule = doctorSchedules.filter(
          (d) => d.day === 'SATURDAY'
        );
      },
      () => {
        this.toastr.error('Error loading schedule');
      }
    );
  }
}