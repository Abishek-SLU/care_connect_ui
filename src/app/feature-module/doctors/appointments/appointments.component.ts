import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  patients: any[] = [];
  appointments: any[] = [];
  filteredAppointments: any[] = [];

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData();
  }

  // Load data from localStorage (if empty, create dummy data)
  loadData() {
    const savedPatients = localStorage.getItem('patientsData');
    const savedAppointments = localStorage.getItem('appointmentsData');

    if (savedPatients) {
      this.patients = JSON.parse(savedPatients);
    } else {
      this.patients = [
        {
          id: 1,
          name: 'Richard Wilson',
          img: 'assets/img/patients/patient.jpg',
          email: 'richard@example.com',
          phone: '+1 202-555-0125',
          address: '806 Twin Willow Lane',
        },
        {
          id: 2,
          name: 'Champagne',
          img: 'assets/img/patients/patient2.jpg',
          email: 'champagne@example.com',
          phone: '+1 202-555-0177',
          address: '21 Broadway, NY',
        }
      ];
      localStorage.setItem('patientsData', JSON.stringify(this.patients));
    }

    if (savedAppointments) {
      this.appointments = JSON.parse(savedAppointments);
    } else {
      this.appointments = [
        { id: 1, patientId: 1, date: '14 Nov 2019', time: '10:00 AM', status: 'active' },
        { id: 2, patientId: 2, date: '15 Nov 2019', time: '11:30 AM', status: 'active' }
      ];
      localStorage.setItem('appointmentsData', JSON.stringify(this.appointments));
    }

    this.syncPatients();
  }

  // Merge patient info into appointment for display
  syncPatients() {
    this.filteredAppointments = this.appointments
      .filter(a => a.status === 'active')
      .map(a => ({
        ...a,
        patient: this.patients.find(p => p.id === a.patientId)
      }));
  }

  // Accept Appointment
  accept(appointment: any) {
    const index = this.appointments.findIndex(a => a.id === appointment.id);
    if (index !== -1) {
      this.appointments[index].status = 'accepted';
      this.saveAppointments();
      this.toastr.success(`Appointment with ${appointment.patient.name} accepted`);
    }
    this.syncPatients();
  }

  // Decline Appointment
  decline(appointment: any) {
    const index = this.appointments.findIndex(a => a.id === appointment.id);
    if (index !== -1) {
      this.appointments[index].status = 'declined';
      this.saveAppointments();
      this.toastr.error(`Appointment with ${appointment.patient.name} declined`);
    }
    this.syncPatients();
  }

  // Save appointments to localStorage
  saveAppointments() {
    localStorage.setItem('appointmentsData', JSON.stringify(this.appointments));
  }
}