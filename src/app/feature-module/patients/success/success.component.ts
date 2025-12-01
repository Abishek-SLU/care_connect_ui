import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  appointment: any = null;

  doctorDetails: any = null;
  scheduleDetails: any = null;

  doctorName: string = '';
  dateLabel: string = '';
  timeLabel: string = '';

  loading: boolean = true;            // 🔥 Spinner flag
  doctorLoaded: boolean = false;       // Track doctor API
  scheduleLoaded: boolean = false;     // Track schedule API

  constructor(
    private router: Router,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    const stored = localStorage.getItem('appointmentDetails');
    if (!stored) {
      this.loading = false;
      return;
    }

    this.appointment = JSON.parse(stored);

    this.dateLabel = this.formatDate(this.appointment.appointmentDate);

    if (this.appointment.doctorId) {
      this.loadDoctor(this.appointment.doctorId);
    } else {
      this.doctorLoaded = true;
    }

    if (this.appointment.scheduleId) {
      this.loadSchedule(this.appointment.scheduleId);
    } else {
      this.scheduleLoaded = true;
    }

    this.checkLoadingComplete();
  }

  loadDoctor(doctorId: string): void {
    this.commonService.getDoctorDetails(doctorId).subscribe((res: any) => {
      const data = res?.data || res;
      this.doctorDetails = data;

      const fullName = `${data.firstname || ''} ${data.lastname || ''}`.trim();
      this.doctorName = fullName ? 'Dr. ' + fullName : 'Doctor';

      this.doctorLoaded = true;
      this.checkLoadingComplete();
    });
  }

  loadSchedule(scheduleId: string): void {
    this.commonService.getScheduleById(scheduleId).subscribe((res: any) => {
      const data = res?.data || res;
      this.scheduleDetails = data;

      this.timeLabel =
        this.formatTime(data.startTime) +
        ' to ' +
        this.formatTime(data.endTime);

      this.scheduleLoaded = true;
      this.checkLoadingComplete();
    });
  }

  checkLoadingComplete(): void {
    if (this.doctorLoaded && this.scheduleLoaded) {
      this.loading = false;   // 🔥 Hide spinner only when both APIs finished
    }
  }

  private formatDate(dateStr: string): string {
    const parts = dateStr.split('-');
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  private formatTime(time24: string): string {
    const [hStr, m] = time24.split(':');
    let h = parseInt(hStr, 10);
    const suffix = h >= 12 ? 'PM' : 'AM';
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;
    return `${h}:${m} ${suffix}`;
  }

  viewInvoice(): void {
    this.router.navigate(['/pages/invoice/view'], {
      queryParams: { id: this.appointment?.id }
    });
  }
}