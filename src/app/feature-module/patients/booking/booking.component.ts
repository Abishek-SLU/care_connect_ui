import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/core/service/service.index';

interface DoctorSchedule {
  id: string;
  doctorId: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  maxPatient: number;
}

interface DaySlot {
  date: Date;
  dateStr: string;
  weekday: string;
  schedules: DoctorSchedule[];
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  doctorId: string | null = null;
  doctorDetails: any;
  userDetails: any;

  daySlots: DaySlot[] = [];
  selectedDay: DaySlot | null = null;
  selectedSchedule: DoctorSchedule | null = null;
  dateRangeLabel = '';

  constructor(
    private route: ActivatedRoute,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.queryParamMap.get('id');
    if (this.doctorId) {
      this.loadDoctorSchedules(this.doctorId);
    }
    this.getDoctorsDetails();
    this.patientDetails();
  }

  loadDoctorSchedules(doctorId: string): void {
    this.commonService.getDoctorSchedules(doctorId).subscribe((res: any) => {
      let raw = res;
      if (res && res.data) {
        raw = res.data;
      }
      let list: DoctorSchedule[] = [];
      if (raw && Array.isArray(raw)) {
        list = raw;
      } else if (raw && raw.content && Array.isArray(raw.content)) {
        list = raw.content;
      }
      this.buildDaySlotsFromSchedules(list);
    });
  }

  private buildDaySlotsFromSchedules(schedules: DoctorSchedule[]): void {
    if (!schedules || !schedules.length) {
      this.daySlots = [];
      this.selectedDay = null;
      this.selectedSchedule = null;
      this.dateRangeLabel = '';
      return;
    }

    const uniqueDates = Array.from(new Set(schedules.map(s => s.date))).sort();

    this.daySlots = uniqueDates.map(dateStr => {
      const parts = dateStr.split('-').map(v => Number(v));
      const year = parts[0];
      const month = parts[1] - 1;
      const day = parts[2];
      const date = new Date(year, month, day);
      const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      const daySchedules = schedules.filter(s => s.date === dateStr);
      return {
        date,
        dateStr,
        weekday,
        schedules: daySchedules
      };
    });

    this.selectedDay = this.daySlots[0];

    const first = this.daySlots[0].date;
    const last = this.daySlots[this.daySlots.length - 1].date;
    this.dateRangeLabel = this.formatRangeLabel(first, last);
  }

  private formatRangeLabel(start: Date, end: Date): string {
    const startStr = start.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const endStr = end.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    if (startStr === endStr) {
      return startStr;
    }
    return startStr + ' - ' + endStr;
  }

  selectDay(slot: DaySlot): void {
    this.selectedDay = slot;
    this.selectedSchedule = null;
  }

  selectSchedule(slot: DoctorSchedule): void {
    this.selectedSchedule = slot;

    const scheduleForStorage = {
      scheduleId: slot.id,
      doctorId: this.doctorId,
      date: this.selectedDay ? this.selectedDay.dateStr : slot.date,
      dayName: this.selectedDay ? this.selectedDay.weekday : '',
      startTime: slot.startTime,
      endTime: slot.endTime,
      maxPatient: slot.maxPatient
    };

    localStorage.setItem('selectedSchedule', JSON.stringify(scheduleForStorage));
  }

  convertTo12Hour(time24: string): { time: string; period: string } {
    if (!time24) {
      return { time: '', period: '' };
    }
    const parts = time24.split(':');
    const hourStr = parts[0];
    const minuteStr = parts[1];
    let hour = parseInt(hourStr, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour = hour - 12;
    }
    return { time: hour + ':' + minuteStr, period };
  }

  getDoctorsDetails(): void {
    if (!this.doctorId) {
      return;
    }
    this.commonService.getDoctorDetails(this.doctorId).subscribe(res => {
      this.doctorDetails = res;
    });
  }

  patientDetails(): void {
    let userId = localStorage.getItem('id');
    if (!userId) {
      userId = '1';
    }
    this.commonService.getPatientDetails(userId).subscribe(res => {
      this.userDetails = res;
    });
  }
}