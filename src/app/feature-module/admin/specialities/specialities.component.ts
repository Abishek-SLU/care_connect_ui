import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})
export class SpecialitiesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  speciality:any = [];
  errorMessage!: string;
  name:any;
  id:any;
  key:any;
  constructor(
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getSpecialityList();
    this.dtOptions = {
      searching: false,
      lengthChange: false,
      info: false,
      
    }
  }

  getSpecialityList() {
    this.commonService.getSpeciality().subscribe(
      {
        next:(res:any)=>{
          this.speciality = res;
        },
        error:(err:any)=>{
          this.errorMessage = <any>err;
        }
        
      }
    )
  }

  save() {
    // let count = this.speciality.reverse()[0]['key'] + 1;
    // let id = this.speciality.reverse()[0]['id'] + 1
    // let params = {
    //   id : id,
    //   key : count,
    //   speciality : this.name
    // }
    // this.commonService.createSpeciality(params).subscribe((data : any[])=>{
    //   this.modalRef.hide();
    //   this.getSpecialityList();
    // })
    // this.modalRef.hide();
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
    // this.commonService.updateSpeciality(params,this.id).subscribe((data : any[])=>{
    //   this.modalRef.hide();
    //   this.getSpecialityList();
    // });
    // this.modalRef.hide();
  }

  deleteSpeciality() {
    this.speciality = this.speciality.filter((a:any) => a.id !== this.id);
    this.commonService.deleteSpeciality(this.id).subscribe(() => {
      // this.modalRef.hide();
      this.getSpecialityList();
    });
  }

  decline() {
    // this.modalRef.hide();
  }

}
