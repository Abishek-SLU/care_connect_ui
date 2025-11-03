import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router,Event } from '@angular/router';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  name: any;
  isDoctor:boolean = false;
  base = 'common';
  page = 'Country';
  splitVal: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('roleName') == 'DOCTOR'){
      this.isDoctor = true;
    }else{
      this.isDoctor = false;
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
        if(event.url  === '/common/country'){
          this.page = 'Country';
        }
        if(event.url   === '/common/state'){
          this.page = 'State';
        }
        if(event.url   === '/common/district'){
          this.page = 'District';
        }
        if(event.url   === '/common/bloodGroup'){
          this.page = 'BloodGroup';
        }
       
      }
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  navigate(name: any) {
    this.name = name;
  }
}


