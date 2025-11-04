import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DocScheduleTimingService } from 'src/app/core/service/doctors/doctor-scheduleTiming/doc-schedule-timing.service';
//import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-schedule-timing',
  templateUrl: './schedule-timing.component.html',
  styleUrls: ['./schedule-timing.component.css'],
  providers: [DatePipe]
})
export class ScheduleTimingComponent implements OnInit {

  endTime: string | undefined;
  [x: string]: any;
  addTimeSlotForm !: FormGroup;
  isAddTime: boolean = false;
  showRequiredMessage: boolean = false;
  validation = false;
  submitted = false;
  dates: any;
  dateRange: any = [];
  activeIndex: number = 0;
  doctorId: any;
  clinicGet: any = [];
  weekDayAll: any;
  weekDay: any;
  day: any;
  date: any;
  dateArr: any = [];
  currentDate: any;
  dayGet: any;
  currentTime: any;
  getCurrentTime: any;
  getSchedule: any = [];
  sundaySchedule: any = [];
  mondaySchedule: any = [];
  tuesdaySchedule: any = [];
  wednesdaySchedule: any = [];
  thursdaySchedule: any = [];
  fridaySchedule: any = [];
  saturdaySchedule: any = [];
  dateCurrent: any;
  isEdit: boolean = false;
  scheduleGet: any = [];
  dayId: any;

  constructor(
    private modalservice: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    // private spinner: NgxSpinnerService,
    private docScheduleTimingservice: DocScheduleTimingService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.doctorId = localStorage.getItem("userRoleId");
    this.getDocSchedule();
    let currentdates = new Date();
    this.getCurrentTime = currentdates.getHours() + ':' + currentdates.getMinutes();
    this.currentTime = currentdates.getHours() + ':' + currentdates.getMinutes() + ':' + currentdates.getSeconds();
    this.currentDate = currentdates.toLocaleDateString('en-us');
    this.dayGet = currentdates.toLocaleDateString('en-us', { weekday: 'long' }).toUpperCase();
    this.weekDay = currentdates.toLocaleDateString('en-us', { weekday: 'long' }).toUpperCase();
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

    for (let i = 0; i < 7; i++) {
      const newDate = new Date(currentdates);
      newDate.setDate(currentdates.getDate() + i);
      this.day = newDate.toLocaleDateString('en-us', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' });
      const getDate = this.day.split(', ');
      this.weekDayAll = getDate[0].toUpperCase();
      const date = getDate[1];
      const dateArray = {
        date: date,
        weekday: this.weekDayAll
      }
      this.dateArr.push(dateArray);
    }
    this.addTimeSlotForm = this.fb.group({
      id: [null],
      doctorId: [this.doctorId],
      day: [null],
      date: [null],
      drScheduleObj: this.fb.array([this.createAddTimeSlot()]),
    })
    this.getByIdDocClinic();
    this.dateGet(this.currentDate, this.dayGet)
  }

  setActiveDate(index: number) {
    this.activeIndex = index;
  }

  openModal(data: any) {
    this.dateCurrent = this.date;
    console.log(this.dateCurrent);

    this.validation = false;
    this.showRequiredMessage = false;
    this.addTimeSlotInfo.clear();
    this.addTimeSlotForm.reset({});
    this.addClinicButton();
    this.modalservice.open(data, { size: "lg" });
  }

  public getTime(event: any): void {
    const inputTime = event.target.value;
    const [hours, minutes, seconds, modifier] = inputTime.split(':').map(Number);
    const convertedTime = this.convertTo24HourFormat(hours, minutes, seconds, modifier);
  }

  public convertTo24HourFormat(hours: number, minutes: number, seconds: number, modifier: string): string {
    let convertedHours = hours;
    if (convertedHours < 12 && modifier === 'PM') {
      convertedHours += 12;
    } else if (convertedHours === 12 && modifier === 'AM') {
      convertedHours = 0;
    }
    return `${convertedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  get f() {
    return this.addTimeSlotForm.controls;
  }

  get addTimeSlotInfo() {
    return this.addTimeSlotForm.get('drScheduleObj') as FormArray;
  }

  dateGet(date: any, day: any) {
    this.date = date;
    this.dayGet = day;
  }

  getCurrentDate(res: any) {
    // console.log(res);

    let dates = res.split('/');
    let date = ((dates[1] > 10) ? (dates[1]) : '0' + dates[1]) + '/' + dates[0] + '/' + dates[2];
    return date;
  }

  dateChanger(res: string) {
    if (res) {
      let dateFormat = res.split('/');
      let date = parseInt(dateFormat[1]) < 10 ? 0 + dateFormat[1] : dateFormat[1];

      let dates = dateFormat[2] + '/' + dateFormat[0] + '/' + date;
      return dates;
    } else {
      return '';
    }
  }

  createAddTimeSlot() {
    return this.fb.group({
      id: [null],
      clinicId: [null, Validators.required],
      maxPatients: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      // status: "ACTIVE"
    })
  }

  addClinicButton() {
    this.validation = false;
    this.showRequiredMessage = false;
    let newClinic = this.createAddTimeSlot();

    this.addTimeSlotInfo.push(newClinic);
  }

  deleteAddClinic(modal: any, event: any, i: any) {
    const id = event.value.id;
    if (id) {
      this.docScheduleTimingservice.scheduleDelete(id).subscribe((res: any) => {
        this.toastr.error('Schedule Deleted Successfully');
        this.addTimeSlotInfo.removeAt(i);
        this.getDocSchedule();
        if (this.addTimeSlotInfo.length === 0) {
          modal.dismiss('Cross click'); // Dismiss the modal when the last slot is deleted.
        }
      }, (err: any) => {
        this.toastr.error(err.error.error.reason);
      });
    } else {
      this.addTimeSlotInfo.removeAt(i);
      if (this.addTimeSlotInfo.length === 0) {
        modal.dismiss('Cross click'); // Dismiss the modal when the last slot is deleted.
      }
    }
  }

  deleteSchTime() {

  }

  openEditModal(id: any, data: any) {
    this.dayId = id;
    this.modalservice.open(data, { size: "lg" });
    this.docScheduleTimingservice.scheduleGetBy(id).subscribe((res: any) => {
      this.scheduleGet = res.data;
      this.dateCurrent = this.scheduleGet.date;

      this.addTimeSlotForm.patchValue({
        id: res.data.dayId,
        doctorId: res.data.doctorId,
        day: res.data.day,
        date: res.data.date
      })
      let schedule = this.addTimeSlotForm.get('drScheduleObj') as FormArray;
      schedule.controls = [];
      res.data.childObj.forEach((x: any) => {
        schedule.push(this.createAddTimeSlot());
      })
      res.data.childObj.forEach((x: any, i: any) => {
        schedule.at(i).patchValue({
          id: x.childScheduleId,
          clinicId: x.clinicId,
          maxPatients: x.maxPatients,
          startTime: x.startTime,
          endTime: x.endTime,
        })
      })

    }, (err) => {
      this.toastr.error(err.error.error.reason);
      // this.spinner.hide();
    })
  }

  convertTo12HourFormat(time24: string): string {
    if (time24 === null || time24 === undefined) {
      return '';
    }
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const isPM = hour >= 12;
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const period = isPM ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${period}`;
  }

  saveChanges(modal: any) {
    this.validation = true;
    if (this.dayId) {
      let obj = this.addTimeSlotForm.value;
      obj.day = this.dayGet;
      obj.doctorId = this.doctorId;
      obj.date = this.dateChanger(this.date);
      obj.drScheduleObj.forEach((ele: any) => {
        ele.maxPatients = Number(ele.maxPatients);
        const [hour, minutes] = ele.startTime.split(':');
        const seconds = '00';
        ele.startTime = `${hour}:${minutes}:${seconds}`;
        const [h, min] = ele.endTime.split(':');
        const sec = '00';
        ele.endTime = `${h}:${min}:${sec}`;
      });
      this.docScheduleTimingservice.scheduleUpdate(obj).subscribe((res: any) => {
        console.log(res);

        this.addTimeSlotForm.reset({});
        modal.dismiss('cross click');
        this.getDocSchedule();
      },
        (err: any) => {
          this.toastr.error(err.error.error.reason)
        })
    } else {
      let obj = this.addTimeSlotForm.value;
      obj.day = this.dayGet;
      obj.doctorId = this.doctorId;
      obj.date = this.dateChanger(this.date);

      obj.drScheduleObj.forEach((ele: any) => {
        ele.maxPatients = Number(ele.maxPatients);
        ele.startTime = ele.startTime + ':00';
        ele.endTime = ele.endTime + ':00';
      });
      this.docScheduleTimingservice.addSlotCreate(obj).subscribe(res => {
        this.addTimeSlotForm.reset({});
        modal.dismiss('cross click')
        this.getDocSchedule();
      })
    }
  }

  dateChange(res: any) {
    let dates = res.split('/');
    let date = dates[2] + '/' + dates[0] + '/' + dates[1];
    return date;
  }

  // passTime(e: any, i: number) {


  //   let time = e.target.value;
  //   console.log(time);
  //   let date = this.date;
  //   console.log(this.currentDate == date);
  //   console.log(this.getCurrentTime >= time);
  //   console.log(this.currentDate == date && (this.getCurrentTime >= time));
  //   if (!time) {
  //     return;
  //   } else {
  //     if (this.currentDate == date && (this.getCurrentTime >= (time))) {
  //       this.toastr.error('Time has finished, Choose another Time');
  //       const startTimeControl = this.addTimeSlotInfo.at(i).get('startTime')!;
  //       startTimeControl.setValue('');
  //       startTimeControl.setErrors({ 'required': true });
  //       this.showRequiredMessage = true;
  //     } else {
  //            startTimeControl.setErrors(null); 
  //     }
  //   }
  // }

  // passEndTime(e: any, i: number) {


  //   let time = e.target.value;
  //   console.log(time);
  //   let date = this.date;
  //   console.log(this.currentDate == date);
  //   console.log(this.getCurrentTime >= time);
  //   console.log(this.currentDate == date && (this.getCurrentTime >= time));

  //   if (!time) {
  //     return;
  //   } else {
  //     if (this.currentDate == date && (this.getCurrentTime >= time)) {
  //       this.toastr.error('Time has finished, Choose another Time');
  //       const endTimeControl = this.addTimeSlotInfo.at(i).get('endTime')!;
  //       endTimeControl.setValue('');
  //       endTimeControl.setErrors({ 'required': true });
  //       this.showRequiredMessage = true;
  //     } else {
  //            startTimeControl.setErrors(null); 
  //     }
  //   }
  // }
  passTime(e: any, i: number) {
    let time = e.target.value;
    console.log(time);
    let date = this.date;
    console.log(this.currentDate == date);
    let dates = new Date();
    let getCurrentTime = dates.getHours() + ':' + dates.getMinutes();;
    console.log(time);
    console.log(getCurrentTime);
    console.log(getCurrentTime >= time);
    console.log(this.currentDate == date && (getCurrentTime >= time));
    console.log(this.currentDate == date && (this.getCurrentTime >= time));

    const startTimeControl = this.addTimeSlotInfo.at(i).get('startTime')!;

    if (time) {
      if (this.currentDate == date && getCurrentTime >= time) {
        this.toastr.error('Time has finished, Choose another Time');
        startTimeControl.setValue('');
        startTimeControl.setErrors({ 'required': true });
      } else {
        startTimeControl.setErrors(null); // Reset errors for the specific control
      }
    }
  }

  passEndTime(e: any, i: number) {
    let time = e.target.value;
    let dates = new Date();
    let getCurrentTime = dates.getHours() + ':' + dates.getMinutes();;

    let date = this.date;
    console.log(time);
    console.log(getCurrentTime);
    console.log(getCurrentTime >= time);
    console.log(this.currentDate == date && (getCurrentTime >= time));

    const endTimeControl = this.addTimeSlotInfo.at(i).get('endTime')!;

    if (time) {
      if (this.currentDate == date && getCurrentTime >= time) {
        this.toastr.error('Time has finished, Choose another Time');
        endTimeControl.setValue('');
        endTimeControl.setErrors({ 'required': true });
      } else {
        endTimeControl.setErrors(null); // Reset errors for the specific control
      }
    }
  }

  getByIdDocClinic() {
    this.docScheduleTimingservice.doctorClinicIdGet(this.doctorId).subscribe(res => {
      this.clinicGet = res.data.drClinicObj;
    }, (err) => {
      this.toastr.error(err.error.error.reason);
      // this.spinner.hide();
    })
  }

  getDocSchedule() {
    //this.spinner.show();
    this.docScheduleTimingservice.scheduleGet(this.doctorId).subscribe((res: any) => {
      this.getSchedule = res.data;
      // this.spinner.hide();
      this.sundaySchedule = this.getSchedule.filter((day: any) => day.day == "SUNDAY");
      this.mondaySchedule = this.getSchedule.filter((day: any) => day.day == "MONDAY");
      this.tuesdaySchedule = this.getSchedule.filter((day: any) => day.day == "TUESDAY");
      this.wednesdaySchedule = this.getSchedule.filter((day: any) => day.day == "WEDNESDAY");
      this.thursdaySchedule = this.getSchedule.filter((day: any) => day.day == "THURSDAY");
      this.fridaySchedule = this.getSchedule.filter((day: any) => day.day == "FRIDAY");
      this.saturdaySchedule = this.getSchedule.filter((day: any) => day.day == "SATURDAY");
    }, (err) => {
      this.toastr.error(err.error.error.reason);
      // this.spinner.hide();
    })
  }

  // deleteSchTime(data: any) {
  //   let obj = {
  //     scheduleId: '',
  //     status: ''
  //   };
  //   obj.scheduleId = data.childScheduleId;
  //   obj.status = 'INACTIVE';
  //   this.docScheduleTimingservice.scheduleInActive(obj).subscribe((res: any) => {
  //     this.toastr.error('Schedule Deleted Successfully');
  //     this.getDocSchedule();
  //     this.docScheduleTimingservice.scheduleCancel(obj.scheduleId, obj).subscribe((res: any) => {
  //       // this.toastr.success(res.data);
  //     })
  //   }, (err: any) => {
  //     this.toastr.error(err.error.error.reason)
  //   })
  // }

}