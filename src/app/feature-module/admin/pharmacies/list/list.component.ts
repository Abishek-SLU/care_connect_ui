import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  pharmacyList = [];
  errorMessage!: string;
  name:any;
  id:any;
  key:any;
  constructor(
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getPharmacy();
    this.dtOptions = {
      searching: false,
      lengthChange: false,
      info: false,
      
    }
  }

  getPharmacy() {
    this.commonService.getPharmacy().subscribe(
      (data: any) => {
        this.pharmacyList = data;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  editModal(template: TemplateRef<any>, pharmacy:any) {
    this.id = pharmacy.id;
    this.name = pharmacy.name;
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
    // this.modalRef.hide();
  }

  


  save() {
    // this.modalRef.hide();
  }

  deletePharmacy() {
    this.pharmacyList = this.pharmacyList.filter((a:any) => a.id !== this.id);
    this.commonService.deleteProduct(this.id).subscribe((data: any) => {
      // this.modalRef.hide();
      this.getPharmacy();
    });
  }

  decline() {
    // this.modalRef.hide();
  }
}
