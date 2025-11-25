import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  appointments: any[] = [];
  patients: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadPatients();
    this.loadAppointments();
    this.filterAcceptedPatients();
  }

  // Load Patients
  loadPatients() {
    const savedPatients = localStorage.getItem('patientsData');
    if (savedPatients) {
      this.patients = JSON.parse(savedPatients);
    } else {
      this.patients = [
        {
          key: 'P1001',
          name: 'Richard Wilson',
          img: 'assets/img/patients/patient.jpg',
          address: '806 Twin Willow Lane',
          phone: '1 202-555-0125',
          age: 40,
          bloodgroup: 'O+',
          type: 'Regular'
        },
        {
          key: 'P1002',
          name: 'Champagne',
          img: 'assets/img/patients/patient2.jpg',
          address: '21 Broadway, NY',
          phone: '1 202-555-0177',
          age: 32,
          bloodgroup: 'A+',
          type: 'New'
        }
      ];
      localStorage.setItem('patientsData', JSON.stringify(this.patients));
    }
  }

  // Load Appointments
  loadAppointments() {
    const savedAppointments = localStorage.getItem('appointmentsData');
    if (savedAppointments) {
      this.appointments = JSON.parse(savedAppointments);
    } else {
      // Example: one accepted and one active
      this.appointments = [
        { id: 1, patient_key: 'P1001', status: 'accept' },
        { id: 2, patient_key: 'P1002', status: 'active' }
      ];
      localStorage.setItem('appointmentsData', JSON.stringify(this.appointments));
    }
  }

  // Filter accepted patients
  filterAcceptedPatients() {
    const acceptedAppointments = this.appointments.filter(a => a.status === 'accept');
    const acceptedPatientKeys = acceptedAppointments.map(a => a.patient_key);
    this.patients = this.patients.filter(p => acceptedPatientKeys.includes(p.key));
  }
}