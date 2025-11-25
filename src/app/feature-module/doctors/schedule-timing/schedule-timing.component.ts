import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

type ChildSlot = {
  childScheduleId: string; // local id
  maxPatients: number;
  startTime: string; // HH:mm:ss
  endTime: string;   // HH:mm:ss
};

type DaySchedule = {
  dayId: string;      // local id
  doctorId: string;
  day: string;        // e.g., 'MONDAY'
  date: string;       // YYYY/MM/DD
  chidObj: ChildSlot[];
};

@Component({
  selector: 'app-schedule-timing',
  templateUrl: './schedule-timing.component.html',
  styleUrls: ['./schedule-timing.component.css'],
  providers: [DatePipe]
})
export class ScheduleTimingComponent implements OnInit {
  private STORAGE_KEY = 'doctorSchedule';

  [x: string]: any;
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

  // In-memory cache from localStorage
  getSchedule: DaySchedule[] = [];
  sundaySchedule: DaySchedule[] = [];
  mondaySchedule: DaySchedule[] = [];
  tuesdaySchedule: DaySchedule[] = [];
  wednesdaySchedule: DaySchedule[] = [];
  thursdaySchedule: DaySchedule[] = [];
  fridaySchedule: DaySchedule[] = [];
  saturdaySchedule: DaySchedule[] = [];

  dateCurrent: any;
  dayId: string | null = null;

  constructor(
    private modalservice: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.doctorId = localStorage.getItem('userRoleId') || 'LOCAL_DOCTOR';
    this.bootstrapDates();
    this.buildForm();

    // initialize collections
    this.getDocSchedule();
    this.dateGet(this.currentDate, this.dayGet);
  }

  // ---------- UI setup ----------
  private bootstrapDates() {
    const now = new Date();
    this.getCurrentTime = now.getHours() + ':' + now.getMinutes();
    this.currentTime = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    this.currentDate = now.toLocaleDateString('en-us');
    this.dayGet = now.toLocaleDateString('en-us', { weekday: 'long' }).toUpperCase();
    this.weekDay = this.dayGet;

    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      this.day = d.toLocaleDateString('en-us', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' });
      const [weekday, date] = this.day.split(', ');
      this.weekDayAll = weekday.toUpperCase();
      this.dateArr.push({ date, weekday: this.weekDayAll });
    }
  }

  private buildForm() {
    this.addTimeSlotForm = this.fb.group({
      id: [null],
      doctorId: [this.doctorId],
      day: [null],
      date: [null],
      drScheduleObj: this.fb.array([this.createAddTimeSlot()])
    });
  }

  // ---------- Helpers ----------
  get addTimeSlotInfo(): FormArray {
    return this.addTimeSlotForm.get('drScheduleObj') as FormArray;
  }

  private createAddTimeSlot(): FormGroup {
    return this.fb.group({
      id: [null], // local placeholder; we’ll map to childScheduleId
      maxPatients: [null, Validators.required],
      startTime: [null, Validators.required], // "HH:mm" from input
      endTime: [null, Validators.required]
    });
  }

  private loadAll(): DaySchedule[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DaySchedule[]) : [];
  }

  private saveAll(data: DaySchedule[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  private genId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  // ---------- UI Actions ----------
  setActiveDate(index: number) {
    this.activeIndex = index;
  }

  openModal(tpl: any) {
    this.dateCurrent = this.date;
    this.validation = false;
    this.showRequiredMessage = false;
    this.addTimeSlotInfo.clear();
    this.addTimeSlotForm.reset({});
    this.addClinicButton();
    this.dayId = null; // creating new set
    this.modalservice.open(tpl, { size: 'lg' });
  }

  openEditModal(id: string, tpl: any) {
    this.dayId = id;
    this.modalservice.open(tpl, { size: 'lg' });

    const all = this.loadAll();
    const found = all.find((d) => d.dayId === id);
    if (!found) {
      this.toastr.error('Schedule not found');
      return;
    }

    this.dateCurrent = found.date;

    this.addTimeSlotForm.patchValue({
      id: found.dayId,
      doctorId: found.doctorId,
      day: found.day,
      date: found.date
    });

    const schedule = this.addTimeSlotInfo;
    // reset and populate
    while (schedule.length) schedule.removeAt(0);
    found.chidObj.forEach((x) => schedule.push(this.createAddTimeSlot()));
    found.chidObj.forEach((x, i) => {
      const [hS, mS] = x.startTime.split(':');
      const [hE, mE] = x.endTime.split(':');
      schedule.at(i).patchValue({
        id: x.childScheduleId,
        maxPatients: x.maxPatients,
        startTime: `${hS}:${mS}`,
        endTime: `${hE}:${mE}`
      });
    });
  }

  addClinicButton() {
    this.validation = false;
    this.showRequiredMessage = false;
    this.addTimeSlotInfo.push(this.createAddTimeSlot());
  }

  deleteAddClinic(modal: any, group: FormGroup, i: number) {
    const childId = group.value.id as string | null;
    // If editing an existing day, delete immediately from storage
    if (this.dayId && childId) {
      const all = this.loadAll();
      const dayIdx = all.findIndex((d) => d.dayId === this.dayId);
      if (dayIdx !== -1) {
        all[dayIdx].chidObj = all[dayIdx].chidObj.filter((c) => c.childScheduleId !== childId);
        if (all[dayIdx].chidObj.length === 0) {
          // remove the whole day entry if empty
          all.splice(dayIdx, 1);
        }
        this.saveAll(all);
        this.toastr.error('Schedule Deleted Successfully');
        this.getDocSchedule();
      }
    }

    this.addTimeSlotInfo.removeAt(i);
    if (this.addTimeSlotInfo.length === 0) {
      modal.dismiss('Cross click');
    }
  }

  dateGet(date: any, day: any) {
    this.date = date;
    this.dayGet = day;
  }

  getCurrentDate(res: any) {
    const parts = res.split('/');
    const date = ((+parts[1] > 10) ? parts[1] : '0' + parts[1]) + '/' + parts[0] + '/' + parts[2];
    return date;
  }

  dateChanger(res: string) {
    if (!res) return '';
    const [mm, dd, yyyy] = res.split('/');
    const day2 = parseInt(dd, 10) < 10 ? '0' + parseInt(dd, 10) : dd;
    return `${yyyy}/${mm}/${day2}`;
  }

  convertTo12HourFormat(time24: string): string {
    if (time24 == null) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const isPM = hour >= 12;
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const period = isPM ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${period}`;
  }

  // ---------- Time validation ----------
  passTime(e: any, i: number) {
    const time = e.target.value as string; // "HH:mm"
    const date = this.date;
    const now = new Date();
    const getCurrentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const ctrl = this.addTimeSlotInfo.at(i).get('startTime')!;
    if (time) {
      if (this.currentDate === date && getCurrentTime >= time) {
        this.toastr.error('Time has finished, Choose another Time');
        ctrl.setValue('');
        ctrl.setErrors({ required: true });
      } else {
        ctrl.setErrors(null);
      }
    }
  }

  passEndTime(e: any, i: number) {
    const time = e.target.value as string; // "HH:mm"
    const date = this.date;
    const now = new Date();
    const getCurrentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const ctrl = this.addTimeSlotInfo.at(i).get('endTime')!;
    if (time) {
      if (this.currentDate === date && getCurrentTime >= time) {
        this.toastr.error('Time has finished, Choose another Time');
        ctrl.setValue('');
        ctrl.setErrors({ required: true });
      } else {
        ctrl.setErrors(null);
      }
    }
  }

  // ---------- Save / Load ----------
  saveChanges(modal: any) {
    this.validation = true;

    const obj = this.addTimeSlotForm.value;
    obj.day = this.dayGet;
    obj.doctorId = this.doctorId;
    obj.date = this.dateChanger(this.date);

    // normalize & validate times
    for (const ele of obj.drScheduleObj) {
      if (!ele.startTime || !ele.endTime || !ele.maxPatients) {
        this.toastr.error('Please complete all fields.');
        return;
      }
      // add seconds
      const [sH, sM] = ele.startTime.split(':');
      const [eH, eM] = ele.endTime.split(':');
      ele.maxPatients = Number(ele.maxPatients);
      ele.startTime = `${sH}:${sM}:00`;
      ele.endTime = `${eH}:${eM}:00`;

      // basic logical validation: end after start
      if (ele.endTime <= ele.startTime) {
        this.toastr.error('End time must be after Start time.');
        return;
      }
    }

    const all = this.loadAll();

    if (this.dayId) {
      // Update existing day
      const idx = all.findIndex((d) => d.dayId === this.dayId);
      if (idx === -1) {
        this.toastr.error('Schedule not found to update');
        return;
      }

      // Keep/assign child ids
      const newChildren: ChildSlot[] = obj.drScheduleObj.map((x: any) => ({
        childScheduleId: x.id || this.genId('child'),
        maxPatients: x.maxPatients,
        startTime: x.startTime,
        endTime: x.endTime
      }));

      all[idx] = {
        ...all[idx],
        day: obj.day,
        date: obj.date,
        chidObj: newChildren
      };

      this.saveAll(all);
      this.toastr.success('Schedule updated');
    } else {
      // Create new day
      const exists = all.find((d) => d.day === obj.day && d.date === obj.date && d.doctorId === obj.doctorId);
      if (exists) {
        this.toastr.error('A schedule for this day already exists. Use Edit instead.');
        return;
      }

      const newDay: DaySchedule = {
        dayId: this.genId('day'),
        doctorId: obj.doctorId,
        day: obj.day,
        date: obj.date,
        chidObj: obj.drScheduleObj.map((x: any) => ({
          childScheduleId: this.genId('child'),
          maxPatients: x.maxPatients,
          startTime: x.startTime,
          endTime: x.endTime
        }))
      };

      all.push(newDay);
      this.saveAll(all);
      this.toastr.success('Schedule created');
    }

    this.addTimeSlotForm.reset({});
    modal.dismiss('cross click');
    this.getDocSchedule();
  }

  getDocSchedule() {
    this.getSchedule = this.loadAll().filter((d) => d.doctorId === this.doctorId);

    this.sundaySchedule = this.getSchedule.filter((day: any) => day.day === 'SUNDAY');
    this.mondaySchedule = this.getSchedule.filter((day: any) => day.day === 'MONDAY');
    this.tuesdaySchedule = this.getSchedule.filter((day: any) => day.day === 'TUESDAY');
    this.wednesdaySchedule = this.getSchedule.filter((day: any) => day.day === 'WEDNESDAY');
    this.thursdaySchedule = this.getSchedule.filter((day: any) => day.day === 'THURSDAY');
    this.fridaySchedule = this.getSchedule.filter((day: any) => day.day === 'FRIDAY');
    this.saturdaySchedule = this.getSchedule.filter((day: any) => day.day === 'SATURDAY');
  }
}