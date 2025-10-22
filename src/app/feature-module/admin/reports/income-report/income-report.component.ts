import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexMarkers,
  ApexResponsive
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid
  markers: ApexMarkers
  responsive: ApexResponsive[];
};
declare const $: any;
declare var moment: any;

@Component({
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrls: ['./income-report.component.css']
})
export class IncomeReportComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  public chartOptions: ChartOptions = {
    series: [{
      name: "Video Call",
      data: [0, 2.5, 1, 3, 4, 2, 3, 2, 4]
    },
    {
      name: "Audio Call",
      data: [0, 2, 4, 4.3, 4, 2.5, 3.5, 2.5, 4, 3]
    },
    {
      name: "Chat",
      data: [0, 4, 4.5, 3.8, 4, 2, 3, 3.5, 4, 3]
    }
    ],
    chart: {
      height: 300,
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    fill: {
      colors: ['#0CE0FF', '#1B5A90', '#DFE5FC'],
    },
    markers: {
      size: 3,
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    grid: {
      show: false,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + "k";
        }
      },
      axisBorder: {
        show: true,
      },
    },
    xaxis: {
      categories: ['', '22/11/2021', '23/11/2021', '24/11/2021', '25/11/2021', '26/11/2021', '27/11/2021', '28/11/2021', '25/11/2021', '25/11/2021'],
    },
    responsive: []
  }
  constructor() { 
  }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      lengthChange: false,
      info: false,
      
    }
    if($('.bookingrange').length > 0) {
      var start = moment().subtract(6, 'days');
      var end = moment();
  
      function booking_range(start:any, end:any) {
        $('.bookingrange span').html(start.format('M/D/YYYY') + ' - ' + end.format('M/D/YYYY'));
      }
  
      $('.bookingrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
      }, booking_range);
  
      booking_range(start, end);
    }
  }

}
