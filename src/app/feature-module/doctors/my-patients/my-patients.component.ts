import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css']
})
export class MyPatientsComponent implements OnInit {
  splitVal:any;
  url:any;
  base = 'Doctors';
  page = 'Dashboard';
  constructor(
    private router: Router,
    public commonService: CommonService
  ) { 
    
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[3];
      }
    });
  }

}
