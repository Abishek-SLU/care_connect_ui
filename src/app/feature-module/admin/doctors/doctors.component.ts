import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  doctorsList: any = [];
  errorMessage!: string;

  constructor(public commonService: CommonService) {}

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      lengthChange: false,
      info: false,
    }
    this.getDoctors();
    
  }

  getDoctors() {
    this.commonService.getDoctors().subscribe(
      (res) => {
        this.doctorsList = res;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }
}
