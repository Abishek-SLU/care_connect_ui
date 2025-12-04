import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  defaultImage = 'assets/img/patients/patient.jpg';
  doctorId: string | null = null;
  loading = false;

  constructor(
    private toastr: ToastrService,
    private appointmentsService: CommonService
  ) { }

  ngOnInit(): void {
    this.doctorId = localStorage.getItem('id');
    if (!this.doctorId) {
      this.toastr.error('Doctor not found in session');
      return;
    }
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentsService.getAppointmentsByDoctor(this.doctorId as string).subscribe(
      res => {
        const list = res?.data || [];
        this.appointments = list.map((a: any) => ({
          raw: a,
          id: a.id,
          patientId: a.patientId,
          date: a.appointmentDate,
          bookingDate: a.bookingDate,
          status: a.appointmentStatus,
          paidAmount: a.doctorFee,
          patient: null
        }));
        this.filteredAppointments = this.appointments.filter(
          a => a.status !== 'CANCELED' && a.status !== 'DECLINED'
        );
        this.loadPatientsForAppointments();
        this.loading = false;
      },
      err => {
        const error = err?.error?.error?.reason || 'Failed to load appointments';
        this.toastr.error(error);
        this.loading = false;
      }
    );
  }

  loadPatientsForAppointments(): void {
    const handledIds = new Set<string>();
    this.appointments.forEach(appt => {
      if (appt.patientId && !handledIds.has(appt.patientId)) {
        handledIds.add(appt.patientId);
        this.appointmentsService.getPatientDetails(appt.patientId).subscribe(
          patientRes => {
            const p = patientRes?.data;
            if (!p) {
              return;
            }
            const fullAddressParts = [
              p.addressLine1 || '',
              p.addressLine2 || '',
              p.zipcode || ''
            ].filter((x: string) => x && x.trim().length > 0);
            const patientData = {
              name: ((p.firstname || '') + ' ' + (p.lastname || '')).trim(),
              img: p.patientImage
                ? 'data:image/jpeg;base64,' + p.patientImage
                : this.defaultImage,
              email: p.email || '',
              phone: p.phoneNo || '',
              address: fullAddressParts.join(', ')
            };
            this.appointments
              .filter(a => a.patientId === appt.patientId)
              .forEach(a => (a.patient = patientData));
            this.filteredAppointments = this.appointments.filter(
              a => a.status !== 'CANCELED' && a.status !== 'DECLINED'
            );
          },
          () => { }
        );
      }
    });
  }

  accept(appt: any): void {
    if (!appt || !appt.id) {
      return;
    }
    const updated = { ...appt.raw, appointmentStatus: 'ACCEPTED' };
    this.appointmentsService.updateAppointmentStatus(updated).subscribe(
      (res: any) => {
        const message = res?.data || 'Appointment accepted';
        this.toastr.success("Accepted appointment successfully");
        appt.status = 'ACCEPTED';
        appt.raw = updated;
        this.filteredAppointments = this.appointments.filter(
          a => a.status !== 'CANCELED' && a.status !== 'DECLINED'
        );
      },
      err => {
        const error = err?.error?.error?.reason || 'Failed to accept appointment';
        this.toastr.error(error);
      }
    );
  }

  decline(appt: any): void {
    if (!appt || !appt.id) {
      return;
    }
    const updated = { ...appt.raw, appointmentStatus: 'CANCELED' };
    this.appointmentsService.updateAppointmentStatus(updated).subscribe(
      (res: any) => {
        const message = res?.data || 'Appointment cancelled';
        this.toastr.success(message);
        appt.status = 'CANCELED';
        appt.raw = updated;
        this.filteredAppointments = this.appointments.filter(
          a => a.status !== 'CANCELED' && a.status !== 'DECLINED'
        );
      },
      err => {
        const error = err?.error?.error?.reason || 'Failed to cancel appointment';
        this.toastr.error(error);
      }
    );
  }
}