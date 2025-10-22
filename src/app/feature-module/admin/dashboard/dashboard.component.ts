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
  ApexResponsive,
  ApexNonAxisChartSeries
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
export type ChartOptionsarea = {
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
export type ChartOptionsbar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  grid: ApexGrid
  responsive: ApexResponsive[];
};
export type ChartOptionspie = { 
  series: ApexNonAxisChartSeries
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  chart: ApexChart;
  legend: ApexLegend;
  responsive: ApexResponsive[]; 
  fill: ApexFill;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
  public chartOptionsarea: ChartOptionsarea = {
    series: [{
      name: "Video Call",
      data: [0, 1, 1.5, 3.5, 2]
    },
    {
      name: "Audio Call",
      data: [0, 3, 3.5, 2.5, 3.5]
    },
    {
      name: "Chat",
      data: [0, 4, 4.5, 3.8, 4]
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
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 1,
      colors: ['#0CE0FF', '#1B5A90', '#DFE5FC'],
    },
    markers: {
      size: 3,
    },
    fill: {
      colors: ['#0CE0FF', '#1B5A90', '#DFE5FC'],
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
      categories: ['', '22/11/2021', '23/11/2021', '24/11/2021', '25/11/2021'],
    },
    responsive: []
  };
  public chartOptionsbar: ChartOptionsbar = {
    chart: {
      height: 165,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30px',
      },
    },
    grid: {
      padding: {
        left: -15,
        right: 0
      },
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    series: [{
      name: 'Scheduled Appointment',
      data: [1.6, 1.6, 1.5]
    }, {
      name: 'Doctors Available Now',
      data: [4, 2, 1.8]
    }, {
      name: 'Home Visits',
      data: [9, 4, 6]
    }],
    xaxis: {
      categories: ['09:00', '10:00', '11:00'],
      axisBorder: {
        show: true,
      },
    },
    legend: {
      show: false,
    },
    fill: {
      opacity: 1,
      colors: ['#0CE0FF', '#1B5A90', '#EEF1FE'],
    },
    yaxis: {
      show: false,
      labels: {
        offsetX: 0,
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "€ " + val + "k";
        }
      }
    },
  }
  public chartOptionspie: ChartOptionspie = {
      series: [650, 250],
			 plotOptions: {
				pie: {
				  donut: {
						  size: '60%',
					labels: {
					  show: true,
					   total: {
			  show: false,
					   },
					},
				  },
				},
			 },
			  stroke: {
				lineCap: "round",
        
			  },
			chart: {
				fontFamily: 'Poppins, sans-serif',
				height: 194,
				type: 'donut',
			},
      fill: {
        colors: ['#0CE0FF', '#1B5A90'],
      },
			legend: {show: true,
			position: 'bottom',
				horizontalAlign: 'left',},
			responsive: [{
				breakpoint: 480,
				options: {
					chart: {
						width: 200
					},
					legend: {
						position: 'bottom'
					}
				}
			}]
  }
  constructor() {
    
    
    
    
  }

  ngOnInit(): void {
  }
  appointmentslides = [
    {
      id: '#4544478',
      hours: '50 Min',
      img: 'assets/admin/img/profiles/avatar-02.jpg',
      name: 'Dr. Lester',
      speciality: 'Orthopaedics',
      img2: 'assets/admin/img/profiles/avatar-05.jpg',
      name2: 'Chris Harris',
      id2: '781212',
      timefrom: '08:00am',
      timeto: '08:50pm',
      bookedon: '12/11/2022, 05:30PM',
      moccolor: 'text-danger',
      moc: 'feather-video',
      price: '$30.00K'
    },
    {
      id: '#9789845',
      hours: '20 Min',
      img: 'assets/admin/img/profiles/avatar-06.jpg',
      name: 'Dr. Monroe',
      speciality: 'Hair Specialities',
      img2: 'assets/admin/img/profiles/avatar-07.jpg',
      name2: 'Bess Twishes',
      id2: '787787',
      timefrom: '06:00am',
      timeto: '06:20pm',
      bookedon: '06/11/2022, 04:30PM',
      moccolor: 'text-yellow',
      moc: 'feather-mic',
      price: '$30.00K'
    },
    {
      id: '#9795754',
      hours: '40 Min',
      img: 'assets/admin/img/profiles/avatar-02.jpg',
      name: 'Dr. Clint',
      speciality: 'Neurology',
      img2: 'assets/admin/img/profiles/avatar-08.jpg',
      name2: 'James Aaron',
      id2: '781212',
      timefrom: '12:00am',
      timeto: '12:40pm',
      bookedon: '12/11/2022, 04:30PM',
      moccolor: 'text-primary',
      moc: 'feather-message-square',
      price: '$30.00K'
    },
    {
      id: '#4544478',
      hours: '50 Min',
      img: 'assets/admin/img/profiles/avatar-02.jpg',
      name: 'Dr. Lester',
      speciality: 'Orthopaedics',
      img2: 'assets/admin/img/profiles/avatar-05.jpg',
      name2: 'Chris Harris',
      id2: '781212',
      timefrom: '08:00am',
      timeto: '08:50pm',
      bookedon: '12/11/2022, 05:30PM',
      moccolor: 'text-danger',
      moc: 'feather-video',
      price: '$30.00K'
    },
  ]
  pricingslides = [
    {
      id: '#home',
      day: 'Sun',
      date: '28th',
      active: 'active',
    },
    {
      id: '#menu1',
      day: 'Mon',
      date: '28th',
      active: 'active',
    },
    {
      id: '#menu2',
      day: 'Tue',
      date: 'November 30',
      active: 'active',
    },
    {
      id: '#menu3',
      day: 'Wed',
      date: '1st'
    },
    {
      id: '#menu4',
      day: 'Thu',
      date: '2nd'
    },
    {
      id: '#menu4',
      day: 'Fri',
      date: '2nd'
    },
  ]
  pricingOptions = {
    loop:true,
			margin:10,
			dots: false,
			nav:true,
			navText: [
				'<i class="fas fa-chevron-left"></i>',
				'<i class="fas fa-chevron-right"></i>'
			],
      responsive: {
          0: {
            items: 1
          },
          480 : {
            items: 5,
      margin: 10
          },
          576 : {
            items: 5,
      margin: 15
          },
          768 : {
            items: 5,
      margin: 15
          },
          992 : {
            items: 5,
      margin: 15
          },
          1170: {
            items: 5,
      margin: 15
          },
          1550: {
            items: 5
          }
      }
  }
  appointmentslidesOptions = {
    loop:true,
			margin:15,
			dots: false,
			nav:true,
			navContainer: '.slide-nav-3',
			navText: [ '<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>' ], 
			responsive:{
				0:{
					items:1
				},
				500:{
					items:1
				},
				768:{
					items:2
				},
				1350:{
					items:3
				}
			}
  }
}
