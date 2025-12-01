import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/core/service/doctors/dashboard/dashboard.service';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  activeTab = 'today';
  cancelApp: any[] = [];
  counts: any = {};
  Appointment: any[] = [];
  todayApp: any[] = [];
  currentDate: any;
  roleName: any;
  doctorId: any;
  appId: any;
  imageArr: any[] = [];

  constructor(
    private toastr: ToastrService,
    public commonService: CommonService,
    private service: DashboardService,
    private rout: Router,
    private modalservice: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.roleName = localStorage.getItem('roleName');
    if (this.roleName === 'PATIENT') {
      this.rout.navigate(['/doctors/patientsprofile']);
      return;
    }
    this.doctorId = localStorage.getItem('id');
    if (!this.doctorId) {
      this.toastr.error('Doctor not found in local storage.');
      return;
    }
    this.loadSummary();
    this.loadTodayAppointments();
    this.loadUpcomingAppointments();
    this.getCancelAppointment();
  }

  calculatePercentage(currentValue: number | null | undefined): number {
    const totalValue = 40;
    if (!totalValue || currentValue == null || currentValue < 0) {
      return 0;
    }
    return (currentValue / totalValue) * 100;
  }

  calculatePercentage2(currentValue: number | null | undefined): number {
    const totalValue = 40;
    if (!totalValue || currentValue == null || currentValue < 0) {
      return 0;
    }
    return (currentValue / totalValue) * 100;
  }

  calculatePercentage3(currentValue: number | null | undefined): number {
    const totalValue = 40;
    if (!totalValue || currentValue == null || currentValue < 0) {
      return 0;
    }
    return (currentValue / totalValue) * 100;
  }

  search(activeTab: string): void {
    this.activeTab = activeTab;
  }

  result(activeTab: string): void {
    this.activeTab = activeTab;
  }

  Cancelled(activeTab: string): void {
    this.getCancelAppointment();
    this.activeTab = activeTab;
  }

  openmodal(contant: any): void {
    this.modalservice.open(contant, { size: 'md' });
  }

  loadSummary(): void {
    this.spinner.show();
    this.service.getSummary(this.doctorId).subscribe(
      res => {
        this.counts = res.data;
        this.spinner.hide();
      },
      err => {
        const error = err?.error?.error?.reason || 'Failed to load summary';
        this.toastr.error(error);
        this.spinner.hide();
      }
    );
  }

  loadTodayAppointments(): void {
    this.spinner.show();
    this.service.getToday(this.doctorId).subscribe(
      res => {
        this.todayApp = res.data || [];
        this.imageArr = [];
        for (let i = 0; i < this.todayApp.length; i++) {
          if (this.todayApp[i].patientImage != null) {
            const doctorData = {
              patientImage: atob(this.todayApp[i].patientImage)
            };
            this.todayApp[i].doctorData = doctorData;
          }
          this.imageArr.push(this.todayApp[i]);
        }
        this.spinner.hide();
      },
      err => {
        const error = err?.error?.error?.reason || 'Failed to load today appointments';
        this.toastr.error(error);
        this.spinner.hide();
      }
    );
  }

  loadUpcomingAppointments(): void {
    this.spinner.show();
    this.service.getUpcoming(this.doctorId).subscribe(
      res => {
        this.Appointment = res.data || [];
        for (let i = 0; i < this.Appointment.length; i++) {
          if (this.Appointment[i].patientImage != null) {
            const doctorData = {
              patientImage: atob(this.Appointment[i].patientImage)
            };
            this.Appointment[i].doctorData = doctorData;
          }
          this.imageArr.push(this.Appointment[i]);
        }
        this.spinner.hide();
      },
      err => {
        const error = err?.error?.error?.reason || 'Failed to load upcoming appointments';
        this.toastr.error(error);
        this.spinner.hide();
      }
    );
  }

  getCancelAppointment(): void {
    this.spinner.show();
    this.service.getCancel(this.doctorId).subscribe(
      res => {
        this.cancelApp = res.data || [];
        this.imageArr = [];
        for (let i = 0; i < this.cancelApp.length; i++) {
          if (this.cancelApp[i].patientImage != null) {
            const doctorData = {
              patientImage: atob(this.cancelApp[i].patientImage)
            };
            this.cancelApp[i].doctorData = doctorData;
          }
          this.imageArr.push(this.cancelApp[i]);
        }
        this.spinner.hide();
      },
      err => {
        const error = err?.error?.error?.reason || 'Failed to load cancelled appointments';
        this.toastr.error(error);
        this.spinner.hide();
      }
    );
  }

  accept(id: any): void {
    const statusDto: any = { id: '', status: '' };
    statusDto.id = id;
    statusDto.status = 'ACCEPT';
    this.service.getAcceptApp(statusDto).subscribe(res => {
      this.toastr.success(res.data);
      this.loadTodayAppointments();
      this.loadUpcomingAppointments();
    });
  }

  modal(modal: any, id: any): void {
    this.modalservice.open(modal, { size: 'md' });
    this.appId = id;
  }

  cancel(modal: any): void {
    const statusDto: any = { id: '', status: '' };
    statusDto.id = this.appId;
    statusDto.status = 'CANCEL';
    this.service.getAcceptApp(statusDto).subscribe(res => {
      this.toastr.success(res.data);
      this.loadTodayAppointments();
      this.loadUpcomingAppointments();
      this.getCancelAppointment();
      modal.dismiss('cross click');
    });
  }
}