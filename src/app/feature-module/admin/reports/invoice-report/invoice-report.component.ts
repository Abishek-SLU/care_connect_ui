import { Component, OnInit, TemplateRef } from '@angular/core';
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
import { CommonService } from 'src/app/core/service/service.index';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid
  responsive: ApexResponsive[];
};
declare const $: any;
declare var moment: any;

@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css']
})
export class InvoiceReportComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  public chartOptions: ChartOptions = {
    series: [
      {
        name: "Video Call",
        type: "column",
        data: [4, 2.8, 5, 2, 3.2, 1.2, 2, 3]
      }
    ],
    chart: {
      type: 'bar',
      fontFamily: 'Poppins, sans-serif',
      height: 360,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
      },
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['22/11/2021', '23/11/2021', '24/11/2021', '25/11/2021', '25/11/2021', '25/11/2021', '27/11/2021', '28/11/2021'],
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
    fill: {
      opacity: 1,
      colors: ['#0CE0FF'],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "k";
        }
      }
    },
    responsive: []
  }
  transactions: any = [];
  errorMessage!: string;
  id:any;
  constructor(public commonService: CommonService) {
   }

  ngOnInit(): void {
    this.getTransactions();
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

  getTransactions() {
    this.commonService.getTransactions()
      .subscribe(res => {
        this.transactions = res;
      },
        error => this.errorMessage = <any>error);
  }

  deleteModal(template: TemplateRef<any>, trans:any) {
    this.id = trans.id;
  }

  deleteReport() {
    this.transactions = this.transactions.filter((a:any) => a.id !== this.id);
    // this.modalRef.hide();
    // this.commonService.deleteSpeciality(this.id).subscribe((data : any[])=>{
    //   this.modalRef.hide();
    //   this.getTransactions();
    // })
  }
}
