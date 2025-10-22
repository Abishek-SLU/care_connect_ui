import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      lengthChange: false,
      info: false,
      
    }
  }
}
