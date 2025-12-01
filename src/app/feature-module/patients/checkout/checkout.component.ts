import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  doctorDetails: any;
  doctorId: string | null = null;

  patientDetails: any;
  patientId: string | null = null;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';

  clinicName: string = '';
  clinicAddress: string = '';
  consultFees: string = '';

  selectedSchedule: any = null;
  selectedDateLabel: string = '';
  selectedTimeLabel: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.queryParamMap.get('id');
    this.patientId = localStorage.getItem('patientId') || localStorage.getItem('id');

    const stored = localStorage.getItem('selectedSchedule');
    if (stored) {
      this.selectedSchedule = JSON.parse(stored);
      this.selectedDateLabel = this.formatDate(this.selectedSchedule.date);
      this.selectedTimeLabel = this.formatTimeRange(
        this.selectedSchedule.startTime,
        this.selectedSchedule.endTime
      );
    }

    if (this.doctorId) {
      this.getDoctorDetails(this.doctorId);
    }

    if (this.patientId) {
      this.getPatientDetails(this.patientId);
    }
  }

  getDoctorDetails(id: string): void {
    this.commonService.getDoctorDetails(id).subscribe((res: any) => {
      const data = res && res.data ? res.data : res;
      this.doctorDetails = data;

      if (data.clinicDetails && data.clinicDetails.length > 0) {
        const clinic = data.clinicDetails[0];
        this.clinicName = clinic.clinicName || '';
        this.clinicAddress =
          (clinic.addressLine1 || '') +
          (clinic.addressLine2 ? ', ' + clinic.addressLine2 : '') +
          (clinic.zipcode ? ', ' + clinic.zipcode : '');
        this.consultFees = clinic.consultFees || '';
      }
    });
  }

  getPatientDetails(id: string): void {
    this.commonService.getPatientDetails(id).subscribe((res: any) => {
      const data = res && res.data ? res.data : res;
      this.patientDetails = data;
      this.firstName = data.firstname || data.firstName || '';
      this.lastName = data.lastname || data.lastName || '';
      this.email = data.email || '';
      this.phone = data.phoneNo || data.phone || '';
    });
  }

  booking(): void {
    if (!this.selectedSchedule) {
      this.toastr.error("No schedule selected");
      return;
    }

    if (!this.doctorId || !this.patientId) {
      this.toastr.error("Missing doctor or patient information");
      return;
    }

    const appointmentPayload = {
      doctorId: this.doctorId,
      patientId: this.patientId,
      scheduleId: this.selectedSchedule.scheduleId,
      prescriptionId: null,
      appointmentStatus: "BOOKED",
      appointmentDate: this.selectedSchedule.date,
      bookingDate: new Date().toISOString().split("T")[0],
      doctorFee: Number(this.consultFees)
    };

    this.commonService.createAppointmentApi(appointmentPayload).subscribe(
      (res: any) => {
        this.toastr.success("Appointment booked successfully");
         localStorage.setItem("appointmentDetails", JSON.stringify(res.data));
        localStorage.removeItem("selectedSchedule");
        this.router.navigate(['/patients/success']);
      },
      (err: any) => {
        console.error(err);
        this.toastr.error("Failed to book appointment");
      }
    );
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) {
      return '';
    }

    const parts = dateStr.split('-').map(v => parseInt(v, 10));
    if (parts.length === 3 && !parts.some(isNaN)) {
      const year = parts[0];
      const month = parts[1] - 1;
      const day = parts[2];
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    }

    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return dateStr;
    }
    return d.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  private formatTime(time24: string): string {
    if (!time24) {
      return '';
    }
    const parts = time24.split(':');
    if (parts.length < 2) {
      return time24;
    }
    let h = parseInt(parts[0], 10);
    const m = parts[1];
    const suffix = h >= 12 ? 'PM' : 'AM';
    if (h === 0) {
      h = 12;
    } else if (h > 12) {
      h = h - 12;
    }
    return h.toString() + ':' + m + ' ' + suffix;
  }

  private formatTimeRange(start: string, end: string): string {
    const s = this.formatTime(start);
    const e = this.formatTime(end);
    if (!s && !e) {
      return '';
    }
    if (!e) {
      return s;
    }
    return s + ' - ' + e;
  }
}