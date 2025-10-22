import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  slideConfigure = {
    dots: true,
			autoplay:false,
			infinite: true,
			variableWidth: true,
			prevArrow: false,
			nextArrow: false
  }
  slidetestimoniConfigure = {
    dots: true,
			autoplay:false,
			infinite: true,
			prevArrow: false,
			nextArrow: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 992,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 776,
					settings: {
						slidesToShow: 2
				  	}
			},
			{
				breakpoint: 567,
					settings: {
						slidesToShow: 1
					}
			}]
  }
  slidetestimonislides = [
    {
      img: 'assets/img/patients/patient1.jpg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: '- Jennifer Robinson',
      country: 'Leland, USA'
    },
    {
      img: 'assets/img/patients/patient2.jpg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: '- Denise Stevens',
      country: 'Abington, USA'
    },
    {
      img: 'assets/img/patients/patient3.jpg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: '- Charles Ortega',
      country: 'El Paso, USA'
    },
    {
      img: 'assets/img/patients/patient4.jpg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: '- Jennifer Robinson',
      country: 'Leland, USA'
    },
  ]
  slides = [
    {
      img: 'assets/img/specialities/specialities-01.png',
      speciality: 'Urology',
    },
    {
      img: 'assets/img/specialities/specialities-02.png',
      speciality: 'Neurology',
    },
    {
      img: 'assets/img/specialities/specialities-03.png',
      speciality: 'Orthopedic',
    },
    {
      img: 'assets/img/specialities/specialities-04.png',
      speciality: 'Cardiologist',
    },
    {
      img: 'assets/img/specialities/specialities-05.png',
      speciality: 'Dentist',
    },
    {
      img: 'assets/img/specialities/specialities-01.png',
      speciality: 'Urology',
    },
  ]
}
