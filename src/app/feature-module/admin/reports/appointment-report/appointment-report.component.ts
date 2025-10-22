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
  selector: 'app-appointment-report',
  templateUrl: './appointment-report.component.html',
  styleUrls: ['./appointment-report.component.css']
})
export class AppointmentReportComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  public chartOptions: ChartOptions = {
	  series: [
		  {
			  name: "Video Call",
			  type: "column",
			  data: [4, 2.8, 5, 2, 3.2, 1.2, 2, 3, 2, 3.5, 5, 2]
		  },
		  {
			  name: "Audio call",
			  type: "column",
			  data: [3, 3, 2, 3, 1.5, 1, 3, 2, 3, 1.5, 2, 3]
		  },
		  {
			  name: "Chat",
			  type: "column",
			  data: [4.5, 3.8, 2.5, 3, 4.5, 3, 4.5, 3, 4, 5, 1.5, 2]
		  }
	  ],
	  chart: {
		  type: 'bar',
		  fontFamily: 'Poppins, sans-serif',
		  height: 350,
		  toolbar: {
			  show: false
		  }
	  },
	  plotOptions: {
		  bar: {
			  horizontal: false,
			  columnWidth: '60%',
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
		  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
		  colors: ['#0CE0FF', '#1B5A90', '#DFE5FC']
	  },
	  tooltip: {
		  y: {
			  formatter: function (val) {
				  return val + "k";
			  }
		  }
	  },
	  responsive: []
  };
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
