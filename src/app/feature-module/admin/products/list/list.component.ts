import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  products = [];
  errorMessage!: string;
  name:any;
  id:any;
  key:any;
  constructor(
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.dtOptions = {
      searching: false,
      lengthChange: false,
      info: false,
      
    }
  }

  getProducts() {
    this.commonService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  editModal(template: TemplateRef<any>, category:any) {
    this.id = category.id;
    this.name = category.name;
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

  deleteProduct() {
    this.products = this.products.filter((a:any) => a.id !== this.id);
    this.commonService.deleteProduct(this.id).subscribe((data: any) => {
      // this.modalRef.hide();
      this.getProducts();
    });
  }

  decline() {
    // this.modalRef.hide();
  }
}
