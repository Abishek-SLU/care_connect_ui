import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  reviews: any = [];
  errorMessage!: string;
  id:any;
  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      lengthChange: false,
      info: false,
      
    }
    this.getReviews();
  }

  deleteModal(template: TemplateRef<any>, special:any) {
    let data = this.reviews.filter((a:any) => a.id === special.id);
    this.id = data[0].id;
  }

  getReviews() {
    this.commonService.getReviews()
      .subscribe(res => {
        this.reviews = res;
      },
        error => this.errorMessage = <any>error);
  }
  deleteReview() {
    this.commonService.deleteReview(this.id).subscribe((data: any) => {
      this.getReviews();
    });
  }

  decline() {
  }

}
