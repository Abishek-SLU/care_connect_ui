import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ManageScheduleService } from 'src/app/core/service/doctors/manage-schedule.service';
import { PharmaciesComponent } from '../../admin/pharmacies/pharmacies.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.css']
})
export class ManageScheduleComponent implements OnInit {
  datefilter!: FormGroup;
  day: any;
  reasonForm!: FormGroup;
  appointmentDay: any;
  message: any;
  mobileNo: any;
  value: any;
  date: any;
  dateCurrent: any;
  dateValue: any;
  dayGet: any;
  formatDate: any;
  dateArr: any = [];
  getDate: any;
  modal: any;
  submitted = false
  constructor(
    private fb: FormBuilder,
    private Service: ManageScheduleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalservice: NgbModal,
  ) { }

  ngOnInit(): void {

    let date = new Date().toLocaleDateString('en-us');
    console.log(date);

    let getDate = date.split('/');

    this.dateValue = getDate[2] + '-' + (Number(getDate[0]) < 10 ? '0' + getDate[0] : getDate[0]) + '-' + (Number(getDate[1]) < 10 ? 0 + getDate[1] : getDate[1]);

    console.log(this.dateValue);

    this.dateCurrent = getDate[2] + '/' + getDate[0] + '/' + getDate[1];
    console.log(this.dateCurrent);
    this.datefilter = this.fb.group({
      date: this.dateCurrent,
    })
    this.getManageschedule();
    this.reasonForm = this.fb.group({
      reason: [null, Validators.required]
    })

  }

  dateFormat(data: any) {
    let getDate;
    let dateValue;
    if (data.includes('/')) {
      getDate = data.split('/');
      dateValue = (getDate[2] < 10 ? 0 + getDate[2] : getDate[2]) + '/' + (getDate[1] < 10 ? 0 + getDate[1] : getDate[1]) + '/' + (getDate[0] < 10 ? 0 + getDate[0] : getDate[0]);
    } else if (data.includes('-')) {
      getDate = data.split('-');
      dateValue = getDate[2] + '/' + getDate[1] + '/' + getDate[0];
    }
    return dateValue;
  }
  getManageschedule() {

    console.log(this.datefilter.value.date, typeof this.datefilter.value.date);

    let date = { date: this.dateFormat(this.datefilter.value.date) }
    this.spinner.show();
    this.Service.getSchedule(date).subscribe(res => {
      this.value = res.data;
      this.spinner.hide()

    })
  }
  scheduleId: any;
  Reasonmodal(modal: any, id: any) {
    console.log(id);
    this.modalservice.open(modal, { size: "md" })
    this.scheduleId = id.scheduleId;


  }
  deleteSchTime(modal: any) {
    let obj = {
      scheduleId: '',
      status: '',
      // message:'',
      // date:''   
    };
    obj.scheduleId = this.scheduleId;
    obj.status = 'INACTIVE';

    let objj = {
      scheduleId: '',
      message: '',
      // date:''
    }

    objj.message = this.reasonForm.value.reason;
    objj.scheduleId = this.scheduleId;
    //  objj.date=this.dateValue;

    // obj.message=this.reason.value.reason;
    // obj.date=this.dateValue;
    this.submitted = true;
    let date = { date: (this.dateValue) }
    if (this.reasonForm.invalid) {
      this.toastr.error('Error');
      return;
    }
    else {
      this.Service.createSms(objj, date).subscribe(res => {
        // this.toastr.success('', 'Submit successfully!');
        modal.dismiss('Cross click');

        this.reasonForm.reset({});
        this.getManageschedule();
        this.submitted = false;
        this.Service.getInactive(obj).subscribe((res: any) => {
          this.toastr.success('Schedule Cancelled Successfully');
          this.getManageschedule();
          modal.dismiss('cross click')
        }, (err: any) => {
          this.toastr.error(err.error.error.reason)
        }
        )
      },

      )
    }

    console.log(obj.scheduleId, obj);

  }
  ActiveSchTime(data: any) {
    let obj = {
      scheduleId: '',
      status: ''
    };
    obj.scheduleId = data.scheduleId;
    obj.status = 'ACTIVE';
    this.Service.getInactive(obj).subscribe((res: any) => {
      this.toastr.success('Schedule Active Successfully');
      this.getManageschedule();

    }, (err: any) => {
      this.toastr.error(err.error.error.reason)
    })
    console.log(obj.scheduleId, obj);

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

  public getTime(event: any): void {
    const inputTime = event.target.value;
    const [hours, minutes, seconds, modifier] = inputTime.split(':').map(Number);
    const convertedTime = this.convertTo24HourFormat(hours, minutes, seconds, modifier);
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

  // getMinDate(): string {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear();
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  //   const day = currentDate.getDate().toString().padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // }
  // dateGet(date: any, day: any) {
  //   this.date = date;
  //   this.dayGet = day;
  // }

  // getCurrentDate(res: any) {
  //   // console.log(res);

  //   let dates = res.split('/');
  //   let date = ((dates[1] > 10) ? (dates[1]) : '0' + dates[1]) + '/' + dates[0] + '/' + dates[2];
  //   return date;
  // }
  // convertMonth(scheduleDate: string) {
  //   if (scheduleDate) {
  //     const dateParts = scheduleDate.split('/');
  //     const day = parseInt(dateParts[0], 10);
  //     const month = parseInt(dateParts[1], 10) - 1;
  //     const year = parseInt(dateParts[2], 10);
  //     const dateObject = new Date(year, month, day);
  //     const options: Intl.DateTimeFormatOptions = {
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //     };
  //     const formattedDate = dateObject.toLocaleDateString('en-US', options);
  //     return formattedDate;
  //   } else {
  //     return '';
  //   }
  // }
}
