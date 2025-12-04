import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexFill,
  ApexPlotOptions
} from 'ng-apexcharts';
import * as ApexCharts from 'apexcharts';

import { CommonService } from 'src/app/core/service/service.index';
import { MedicaldetailsService } from 'src/app/core/service/medical-details/medical-details.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  stroke: ApexStroke | any;
  dataLabels: ApexDataLabels | any;
  colors: string[] | any;
  grid: ApexGrid | any;
  title: ApexTitleSubtitle | any;
};

export type chartOptionsheartrate = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

export type chartOptionsfbc = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type chartOptionsweight = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patientId: string | null = null;
  appointments: any[] = [];
  latestMedicalDetails: any = null;
  doctorDetailsMap: { [id: string]: any } = {};

  public bmichartOptions: ChartOptions = {
    series: [
      {
        name: 'BMI',
        data: [10, 20, 24, 23, 22, 24, 25, 24, 23]
      }
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'BMI Trend',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    },
    colors: ['#03a4fb']
  };

  public chartOptionsheartrate: chartOptionsheartrate = {
    series: [{
      name: 'HeartRate',
      data: [72, 76, 80, 90, 98, 85, 88, 92, 95]
    }],
    chart: {
      height: 350,
      type: 'line'
    },
    stroke: {
      width: 7,
      curve: 'smooth'
    },
    xaxis: {
      type: 'category',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
      tickAmount: 7
    },
    title: {
      align: 'left'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#0de0fe'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      }
    },
    markers: {
      size: 4,
      colors: ['#15558d'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },
    yaxis: {
      min: 50,
      max: 120,
      title: {}
    }
  };

  public chartOptionsfbc: chartOptionsfbc = {
    series: [{
      name: 'FBC',
      data: [220, 250, 280, 300, 334, 320, 310, 305, 298, 290, 280, 270]
    }],
    chart: {
      height: 350,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758']
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#0de0fe',
            colorTo: '#0de0fe',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      },
      tooltip: {
        enabled: true
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        formatter: function (val: any) {
          return val;
        }
      }
    },
    title: {
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  };

  public chartOptionsweight: chartOptionsweight = {
    series: [{
      name: 'Weight',
      data: [74, 75, 76, 76, 77, 76, 76, 75, 76, 77, 76]
    }],
    chart: {
      type: 'line',
      height: 350
    },
    stroke: {
      curve: 'stepline'
    },
    dataLabels: {
      enabled: false
    },
    title: {
      align: 'left'
    },
    markers: {
      hover: {
        sizeOffset: 4
      }
    }
  };

  constructor(
    private router: Router,
    public commonService: CommonService,
    public medicaldetailsService: MedicaldetailsService
  ) { }

  ngOnInit(): void {
    this.patientId = localStorage.getItem('id');

    this.loadMedicalDetails();
    this.loadAppointments();

    const chart = new ApexCharts(
      document.querySelector('#bmi-status'),
      this.bmichartOptions
    );
    chart.render();

    const heartratechart = new ApexCharts(
      document.querySelector('#heartrate-status'),
      this.chartOptionsheartrate
    );
    heartratechart.render();

    const fbcchart = new ApexCharts(
      document.querySelector('#fbc-status'),
      this.chartOptionsfbc
    );
    fbcchart.render();

    const weightchart = new ApexCharts(
      document.querySelector('#weight-status'),
      this.chartOptionsweight
    );
    weightchart.render();
  }

  loadAppointments(): void {
    if (!this.patientId) {
      this.appointments = [];
      return;
    }

    this.commonService.getAppointmentsByPatient(this.patientId)
      .subscribe({
        next: (res: any) => {
          const data = res?.data || [];
          this.appointments = data.map((a: any) => ({
            ...a,
            doctorName: '',
            specialization: '',
            doctorImage: ''
          }));

          const uniqueDoctorIds = Array.from(
            new Set(data.map((a: any) => a.doctorId).filter((id: any) => !!id))
          );
          uniqueDoctorIds.forEach(id => this.loadDoctorDetails(id as string));
        },
        error: (err: any) => {
          console.error('Error loading appointments', err);
          this.appointments = [];
        }
      });
  }

  loadDoctorDetails(doctorId: string): void {
    if (!doctorId || this.doctorDetailsMap[doctorId]) {
      return;
    }

    this.commonService.getDoctorDetails(doctorId)
      .subscribe({
        next: (res: any) => {
          const doctor = res?.data || res || {};
          this.doctorDetailsMap[doctorId] = doctor;

          const name =
            `${doctor.firstname || ''} ${doctor.lastname || ''}`.trim() ||
            doctor.fullName ||
            doctor.userName ||
            'Doctor';

          const specialization =
            doctor.specialization ||
            doctor.specializationName ||
            (doctor.specializationDto && doctor.specializationDto.name) ||
            '';

          const image =
            doctor.profileImage ||
            doctor.imageUrl ||
            doctor.photoUrl ||
            '';

          this.appointments = this.appointments.map(appt =>
            appt.doctorId === doctorId
              ? {
                ...appt,
                doctorName: name,
                specialization: specialization,
                doctorImage: image || appt.doctorImage
              }
              : appt
          );
        },
        error: (err: any) => {
          console.error('Error loading doctor details for', doctorId, err);
        }
      });
  }
  loadMedicalDetails(): void {
    if (!this.patientId) {
      this.latestMedicalDetails = null;
      return;
    }

    this.medicaldetailsService.medicalDetailsGet(this.patientId)
      .subscribe({
        next: (res: any) => {

          const list = res?.data || res || [];

          if (Array.isArray(list) && list.length > 0) {

            this.latestMedicalDetails = list[0];
          }
          else if (!Array.isArray(list) && list) {
            this.latestMedicalDetails = list;
          }
          else {
            this.latestMedicalDetails = null;
          }
        },
        error: (err: any) => {
          console.error('Error loading medical details', err);
          this.latestMedicalDetails = null;
        }
      });
  }

  viewPrescription(appt: any): void {
    window.open(
      this.commonService.baseUrl + 'api/prescription/download/appointment/' + appt.id,
      '_blank'
    );

  }
}