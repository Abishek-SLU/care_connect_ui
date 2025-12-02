import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  name: any;
  patientInfo: any;
  id: any;

  constructor(
    private router: Router,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.loadPatientDetails();
  }

  loadPatientDetails() {
    this.commonService.getPatientDetails(this.id).subscribe((res: any) => {
      this.patientInfo = res.data;
      if (this.patientInfo?.patientImage) {
        this.patientInfo.image = 'data:image/jpeg;base64,' + this.patientInfo.patientImage;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.commonService.nextmessage('logout');
    this.router.navigate(['/']);
  }

  navigate(name: any) {
    this.name = name;
    this.commonService.nextmessage(name);
  }
}